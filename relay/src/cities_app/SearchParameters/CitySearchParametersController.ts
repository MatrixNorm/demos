import * as iots from "io-ts";
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
import { assertNever } from "../helpers/typeUtils";

export type EditPayload = md.CitySearchParamsDraft;

type Event = InitEvent | EditEvent | SubmitEvent | CancelEvent;
type InitEvent = { type: "init"; payload: unknown };
type EditEvent = { type: "edit"; payload: EditPayload };
type SubmitEvent = { type: "submit"; payload: { history: History; baseUrl: string } };
type CancelEvent = { type: "cancel" };

type Effect = EffectWriteDraft | EffectWriteValue | EffectRedirect;
type EffectWriteDraft = { type: "writeDraft"; value: md.CitySearchParamsDraft };
type EffectWriteValue = { type: "writeValue"; value: md.CitySearchParams };
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

function reduceInit(payload: unknown): [EffectWriteValue, EffectWriteDraft] {
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
        return [
          { type: "writeValue", value: {} },
          { type: "writeDraft", value: candidate },
        ];
      },
      (goodValue) => {
        return [
          { type: "writeValue", value: goodValue },
          { type: "writeDraft", value: {} },
        ];
      }
    )
  );
}

function reduceEdit(
  draft: md.CitySearchParamsDraft,
  payload: EditPayload
): EffectWriteDraft | null {
  if (ob.isObjectEmpty(payload)) {
    return null;
  }
  return {
    type: "writeDraft",
    value: ob.safeMerge(draft, normalizeEditPayload(payload)),
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

function reduceCancel(): EffectWriteDraft | null {
  return { type: "writeDraft", value: {} };
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
  const { value, draft } = lookupStateFromRelayStore(environment);
  let effects = reduce(value, draft, event);
  if (effects) {
    processEffects(Array.isArray(effects) ? effects : [effects]);
  }
}

function processEffects(effects: Effect[]): void {
  effects.forEach((effect) => {
    switch (effect.type) {
      case "writeValue": {
        return;
      }
      case "writeDraft": {
        return;
      }
      case "redirect": {
        return;
      }
      default: {
        assertNever(effect);
      }
    }
    if (effect.type === "writeState") {
      writeStateIntoRelayStore$(effect.value, environment);
    } else if (effect.type === "redirect") {
      redirectToUrl(effect.value);
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

export function lookupStateFromRelayStore(
  environment: IEnvironment
): { value: md.CitySearchParams; draft: md.CitySearchParamsDraft } {
  const operation = createOperationDescriptor(getRequest(QUERY), {});
  const response = environment.lookup(operation.fragment);
  const value = (response.data.uiState as any)?.citySearchParams;
  const draft = (response.data.uiState as any)?.citySearchParamsDraft;
  if (state) {
    return state;
  } else {
    return { value: {} as Value, draft: {}, errors: {} };
  }
}

export function writeStateIntoRelayStore$(
  state: md.CitySearchParamsState,
  environment: IEnvironment
) {
  const request = getRequest(QUERY);
  const operationDescriptor = createOperationDescriptor(request, {});
  let data = {
    __typename: "__Root",
    uiState: {
      citySearchParamsState: state,
    },
  };
  environment.commitUpdate((store) => {
    // XXX how to delete record recursively
    const path = `${ROOT_ID}:uiState`;
    store.delete(`${path}:citySearchParams`);
    store.delete(`${path}:citySearchParamsDraft`);
  });
  environment.commitPayload(operationDescriptor, data);
  environment.retain(operationDescriptor);
}

function redirectToUrl({ history, url }: { history: History; url: string }) {
  history.push(url);
}

// XXX for reference

// function writeStateIntoRelayStore2$(
//   state: md.CitySearchParamsState,
//   environment: IEnvironment
// ) {
//   environment.commitUpdate((store) => {
//     store.delete(`${ROOT_ID}:uiState:citySearchParamsState`);
//     const uiState = store.get(ROOT_ID)?.getOrCreateLinkedRecord("uiState", "UIState");
//     uiState
//       ?.setLinkedRecord()
//       ?.getOrCreateLinkedRecord("citySearchParamsState", "UICitySearchParamsState");
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
