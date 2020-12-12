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
type EffectRedirect = { type: "redirect"; value: { history: History; url: string } };

const QUERY = graphql`
  query CitySearchParametersControllerQuery {
    ... on Query {
      __typename
    }
    uiState {
      citySearchParamsState {
        ...CitySearchParameters_state @relay(mask: false)
      }
    }
  }
`;

function isEditPayloadEmpty(payload: EditPayload) {
  return Object.values(payload).filter((x) => x !== undefined).length === 0;
}

function urlQueryStringFromSearchParams(searchParams: Value): string {
  const pairs = Object.entries(searchParams).filter(
    ([_, propValue]) => propValue !== undefined
  );
  //@ts-ignore
  return new URLSearchParams(Object.fromEntries(pairs)).toString();
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
  const draft = pipe(
    md.CitySearchParamsCoercer.decode(payload),
    Either.fold(
      () => ({}),
      (coerced) => coerced
    ),
    normalizeInitialPayload
  );
  const state = pipe(
    md.CitySearchParams.decode(draft),
    Either.fold(
      () => {
        return { value: {} as md.CitySearchParams, draft };
      },
      (goodValue) => {
        return {
          value: goodValue,
          draft: {} as md.CitySearchParamsDraft,
        };
      }
    )
  );
  return [
    { type: "writeValue", value: state.value },
    { type: "writeDraft", value: state.value },
  ];
}

function reduceEdit(
  draft: md.CitySearchParamsDraft,
  payload: EditPayload
): EffectWriteDraft | null {
  if (isEditPayloadEmpty(payload)) {
    return null;
  }
  return {
    type: "writeDraft",
    value: ob.safeMerge(draft, normalizeEditPayload(payload)),
  };
}

function reduceSubmit(
  state: md.CitySearchParamsState,
  payload: { history: History; baseUrl: string }
): EffectRedirect | null {
  return pipe(
    md.CitySearchParamsValidState.decode(state),
    Either.fold(
      () => {
        return null;
      },
      (state) => {
        return {
          type: "redirect",
          value: {
            history: payload.history,
            url: `${payload.baseUrl}/${urlQueryStringFromSearchParams(state.value)}`,
          },
        };
      }
    )
  );
}

function reduceCancel(): EffectWriteDraft | null {
  return { type: "writeDraft", value: {} };
}

function reduce(draft: md.CitySearchParamsDraft, event: Event): Effect | Effect[] | null {
  switch (event.type) {
    case "edit": {
      return reduceEdit(draft, event.payload);
    }
    case "init": {
      return reduceInit(event.payload);
    }
    case "submit": {
      return reduceSubmit(draft, event.payload);
    }
    case "cancel": {
      return reduceCancel();
    }
    default:
      assertNever(event);
      return null;
  }
}

export function handleEvent(event: Event, environment: IEnvironment) {
  const state = lookupStateFromRelayStore(environment);
  //console.log("A: ", state, event);
  let effects = reduce(state, event);
  //console.log("B: ", effects);
  if (effects) {
    if (!Array.isArray(effects)) {
      effects = [effects];
    }
    effects.forEach((effect) => {
      if (effect.type === "writeState") {
        writeStateIntoRelayStore$(effect.value, environment);
      } else if (effect.type === "redirect") {
        redirectToUrl(effect.value);
      }
    });
  }
}

export function lookupStateFromRelayStore(
  environment: IEnvironment
): md.CitySearchParamsState {
  const operation = createOperationDescriptor(getRequest(QUERY), {});
  const response = environment.lookup(operation.fragment);
  const state = (response.data.uiState as any)?.citySearchParamsState;
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
    const path = `${ROOT_ID}:uiState:citySearchParamsState`;
    store.delete(`${path}:value`);
    store.delete(`${path}:draft`);
    store.delete(`${path}:errors`);
    store.delete(`${path}`);
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
