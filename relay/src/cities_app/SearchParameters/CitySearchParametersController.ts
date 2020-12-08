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
import { Nullify, assertNever } from "../helpers/typeUtils";
import { entries } from "lodash";

export type EditPayload = Partial<Nullify<md.CitySearchParamsShape>>;
type Value = md.CitySearchParamsState["value"];
type Draft = md.CitySearchParamsState["draft"];

type Event = StartEvent | EditEvent | SubmitEvent | CancelEvent;

type StartEvent = { type: "start"; payload: unknown };
type EditEvent = { type: "edit"; payload: EditPayload };
type SubmitEvent = { type: "submit"; payload: { history: History; baseUrl: string } };
type CancelEvent = { type: "cancel" };

type Effect = EffectWriteState | EffectRedirect;

type EffectWriteState = { type: "writeState"; value: md.CitySearchParamsState };
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

function normalizeInitialPayload(payload: Draft): Draft {
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

function reduceStart(payload: unknown): EffectWriteState {
  const draft: Draft = pipe(
    md.CitySearchParamsCoercer.decode(payload),
    Either.fold(
      () => {
        return {};
      },
      (coerced) => {
        return coerced;
      }
    ),
    normalizeInitialPayload
  );
  const state = pipe(
    md.CitySearchParams.decode(draft),
    Either.fold(
      (validationErrors) => {
        const errors = extractErrors(validationErrors);
        return { value: {} as Value, draft, errors };
      },
      (validDraft) => {
        return {
          value: validDraft,
          draft: {},
          errors: {},
        };
      }
    )
  );
  return { type: "writeState", value: state };
}

function extractErrors(
  validationErrors: iots.Errors
): md.CitySearchParamsState["errors"] {
  return validationErrors.reduce((acc, error) => {
    let c = error.context;
    if (c.length === 2) {
      //@ts-ignore
      acc[c[1].key] = "shit";
    }
    return acc;
  }, {} as md.CitySearchParamsState["errors"]);
}

function applyEditPayloadToDraft(draft: Draft, payload: EditPayload): Draft {
  let nextDraft = { ...draft };
  for (let prop in payload) {
    //@ts-ignore
    let value = payload[prop];
    //@ts-ignore
    if (payload[prop] !== undefined) {
      if (value === null) {
        //@ts-ignore
        delete nextDraft[prop];
      } else {
        //@ts-ignore
        nextDraft[prop] = value;
      }
    }
  }
  return nextDraft;
}

function getCandidateValue(currentValue: Value, draft: Draft): Draft {
  return ob.safeMerge(currentValue, draft);
}

function reduceEdit(
  state: md.CitySearchParamsState,
  payload: EditPayload
): EffectWriteState | null {
  if (isEditPayloadEmpty(payload)) {
    return null;
  }
  const normalizedPayload = normalizeEditPayload(payload);
  const nextDraft = applyEditPayloadToDraft(state.draft, normalizedPayload);
  const candidateValue = getCandidateValue(state.value, nextDraft);
  const nextState = pipe(
    md.CitySearchParams.decode(candidateValue),
    Either.fold(
      (validationErrors) => {
        const errors = extractErrors(validationErrors);
        return { ...state, draft: nextDraft, errors };
      },
      (goodValue) => {
        return {
          value: goodValue,
          draft: {},
          errors: {},
        };
      }
    )
  );
  console.log({ nextState });
  return { type: "writeState", value: nextState };
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

function reduceCancel(state: md.CitySearchParamsState): EffectWriteState | null {
  return { type: "writeState", value: { ...state, draft: {}, errors: {} } };
}

function reduce(state: md.CitySearchParamsState, event: Event): Effect | Effect[] | null {
  console.log(event);

  switch (event.type) {
    case "edit": {
      return reduceEdit(state, event.payload);
    }
    case "start": {
      return reduceStart(event.payload);
    }
    case "submit": {
      return reduceSubmit(state, event.payload);
    }
    case "cancel": {
      return reduceCancel(state);
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
