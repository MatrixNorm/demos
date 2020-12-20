const invariant = require("invariant");

import { graphql } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment,
  ROOT_ID,
} from "relay-runtime";
import { History } from "history";
import { pipe } from "fp-ts/lib/function";
import * as Either from "fp-ts/lib/Either";
import * as md from "./model";
import * as ob from "../helpers/object";
import * as storeHelpers from "../helpers/relayStore";
import { assertNever } from "../helpers/typeUtils";

export type EditPayload = md.CitySearchParamsDraft;

type Event = InitEvent | EditEvent | SubmitEvent | CancelEvent;
type InitEvent = { type: "init"; payload: unknown };
type EditEvent = { type: "edit"; payload: EditPayload };
type SubmitEvent = { type: "submit"; payload: { history: History; baseUrl: string } };
type CancelEvent = { type: "cancel" };

type Effect = EffectWriteState | EffectRedirect;
type EffectWriteState = {
  type: "writeState";
  value?: md.CitySearchParams;
  draft?: md.CitySearchParamsDraft;
};
type EffectRedirect = { type: "redirect"; payload: { history: History; url: string } };

function urlQueryStringFromSearchParams(searchParams: md.CitySearchParams): string {
  // XXX inexplicit conversion from number to string
  //@ts-ignore
  return new URLSearchParams(ob.dropUndefineds(searchParams)).toString();
}

function normalizeEditPayload(payload: EditPayload): EditPayload {
  if (
    payload.countryNameContains !== undefined &&
    payload.countryNameContains !== null &&
    payload.countryNameContains.length === 0
  ) {
    return { ...payload, countryNameContains: null };
  }
  return payload;
}

// XXX code duplication?
function normalizeInitialPayload(payload: md.CitySearchParams): md.CitySearchParams {
  if (
    payload.countryNameContains !== undefined &&
    payload.countryNameContains.length === 0
  ) {
    let next = { ...payload };
    delete next["countryNameContains"];
    return next;
  }
  return payload;
}

function reduceInit(payload: unknown): EffectWriteState {
  const candidate = pipe(
    md.CitySearchParamsCoercer.decode(payload),
    Either.fold(
      () => ({}),
      (coerced) => coerced
    ),
    normalizeInitialPayload
  );
  return pipe(
    md.CitySearchParams.decode(candidate),
    Either.fold(
      () => {
        return { type: "writeState", value: {}, draft: candidate };
      },
      (goodValue) => {
        return { type: "writeState", value: goodValue, draft: {} };
      }
    )
  );
}

function reduceEdit(
  draft: md.CitySearchParamsDraft,
  payload: EditPayload
): EffectWriteState | null {
  if (ob.isObjectEmpty(payload)) {
    return null;
  }
  return {
    type: "writeState",
    draft: ob.safeMerge(draft, normalizeEditPayload(payload)),
  };
}

function reduceSubmit(
  value: md.CitySearchParams,
  draft: md.CitySearchParamsDraft,
  payload: { history: History; baseUrl: string }
): EffectRedirect | null {
  const candidateValue: md.CitySearchParams = ob.dropNulls({
    ...value,
    // XXX
    ...ob.dropUndefineds(draft),
  });
  return pipe(
    md.CitySearchParams.decode(candidateValue),
    Either.fold(
      () => {
        return null;
      },
      (goodValue) => {
        return {
          type: "redirect",
          payload: {
            history: payload.history,
            url: `${payload.baseUrl}/${urlQueryStringFromSearchParams(goodValue)}`,
          },
        };
      }
    )
  );
}

function reduceCancel(): EffectWriteState {
  return { type: "writeState", draft: {} };
}

function reduce(
  value: md.CitySearchParams,
  draft: md.CitySearchParamsDraft,
  event: Event
): Effect | Effect[] | null {
  switch (event.type) {
    case "edit": {
      return reduceEdit(draft, event.payload);
    }
    case "init": {
      return reduceInit(event.payload);
    }
    case "submit": {
      return reduceSubmit(value, draft, event.payload);
    }
    case "cancel": {
      return reduceCancel();
    }
    default: {
      assertNever(event);
      return null;
    }
  }
}

export function handleEvent(event: Event, environment: IEnvironment): void {
  const { value, draft } = coeffectLookupState(environment);
  let effects = reduce(value, draft, event);
  if (effects) {
    processEffects(Array.isArray(effects) ? effects : [effects], environment);
  }
}

function processEffects(effects: Effect[], environment: IEnvironment): void {
  effects.forEach((effect) => {
    switch (effect.type) {
      case "writeState": {
        effectWriteState(effect.value, effect.draft, environment);
        break;
      }
      case "redirect": {
        effectRedirect(effect.payload);
        break;
      }
      default: {
        assertNever(effect);
      }
    }
  });
}

const QUERY = graphql`
  query CitySearchParametersControllerQuery {
    ... on Query {
      __typename
    }
    uiState {
      ...CitySearchParameters_state @relay(mask: false)
    }
  }
`;

export function coeffectLookupState(
  environment: IEnvironment
): { value: md.CitySearchParams; draft: md.CitySearchParamsDraft } {
  const operation = createOperationDescriptor(getRequest(QUERY), {});
  const response = environment.lookup(operation.fragment);
  const uiState = (response.data as any)?.uiState;
  const value = uiState?.citySearchParams || ({} as md.CitySearchParams);
  const draft = uiState?.citySearchParamsDraft || ({} as md.CitySearchParamsDraft);

  invariant(Either.isRight(md.CitySearchParams.decode(value)), "XXX");
  invariant(Either.isRight(md.CitySearchParamsDraft.decode(draft)), "XXX");

  return { value, draft };
}

export function effectWriteState({
  value,
  draft,
  environment,
}: {
  value?: md.CitySearchParams;
  draft?: md.CitySearchParamsDraft;
  environment: IEnvironment;
}): void {
  if (value) {
    invariant(Either.isRight(md.CitySearchParams.decode(value)), "XXX");

    environment.commitUpdate((store) => {
      store.delete(`${ROOT_ID}:uiState:citySearchParams`);
    });
    storeHelpers.commitPayload(environment, QUERY, {
      uiState: { citySearchParams: value },
    });
  }

  if (draft) {
    invariant(Either.isRight(md.CitySearchParamsDraft.decode(draft)), "XXX");

    environment.commitUpdate((store) => {
      store.delete(`${ROOT_ID}:uiState:citySearchParamsDraft`);
    });
    storeHelpers.commitPayload(environment, QUERY, {
      uiState: { citySearchParamsDraft: draft },
    });
  }
}

function effectRedirect({ history, url }: { history: History; url: string }) {
  history.push(url);
}

// For reference. Do not delete.

// function writeValue$(value: md.CitySearchParams, environment: IEnvironment) {
//   environment.commitUpdate((store) => {
//     store.delete(`${ROOT_ID}:uiState:citySearchParamsState`);
//     const uiState = store.get(ROOT_ID)?.getOrCreateLinkedRecord("uiState", "UIState");
//     uiState?.getOrCreateLinkedRecord("citySearchParams", "UICitySearchParams");
//   });
//   if (Object.keys(searchParams).length > 0) {
//     commitLocalUpdate(environment, (store) => {
//       const record = store
//         .get(ROOT_ID)
//         ?.getOrCreateLinkedRecord("uiState", "UIState")
//         ?.getOrCreateLinkedRecord("citySearchParams", "UICitySearchParams");
//       if (record) {
//         for (let key in searchParams) {
//           record.setValue(searchParams[key as keyof SearchParameters], key);
//         }
//       }
//     });
//     retainRecord(QUERY, environment);
//   }
// }
