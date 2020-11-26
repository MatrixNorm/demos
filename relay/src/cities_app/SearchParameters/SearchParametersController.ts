import * as iots from "io-ts";
import { graphql } from "react-relay";
import { createOperationDescriptor, getRequest, IEnvironment } from "relay-runtime";
import { History } from "history";
import { pipe } from "fp-ts/lib/function";
import * as Either from "fp-ts/lib/Either";
import * as o from "../helpers/object";
import * as md from "./model";
import * as t from "./types";
import { SearchParametersControllerQueryResponse } from "__relay__/SearchParametersControllerQuery.graphql";

type EditPayload = Partial<md.CitySearchParamsShape>;

type Event = StartEvent | EditEvent | SubmitEvent | CancelEvent;

type StartEvent = { type: "start"; payload: unknown };
type EditEvent = { type: "edit"; payload: EditPayload };
type SubmitEvent = { type: "submit"; payload: { history: History; baseUrl: string } };
type CancelEvent = { type: "cancel" };

type Effect = EffectWriteState | EffectRedirect;

type EffectWriteState = { type: "writeState"; value: t.SP };
type EffectRedirect = { type: "redirect"; value: { history: History; url: string } };

// module globals

export const BLANK_STATE: t.SpStateBlank = {
  countryNameContains: null,
  populationGte: null,
  populationLte: null,
};

const QUERY = graphql`
  query SearchParametersControllerQuery {
    ... on Query {
      __typename
    }
    uiState {
      citySearchParamsState {
        ...SearchParameters_searchParamsState @relay(mask: false)
      }
    }
  }
`;

function isStateValid(state: t.SP): state is t.SPNoError {
  return !Object.values(state).some((vRecord) => vRecord?.draft?.error);
}

function isEditDeltaEmpty(payload: t.SPEditDelta) {
  return Object.values(payload).filter((x) => x !== undefined).length === 0;
}

function urlQueryStringFromState(state: t.SPNoError): string {
  const pairs = Object.entries(state)
    .map(([prop, vRecord]) => [prop, vRecord?.draft.value || vRecord?.value])
    .filter(([_, value]) => Boolean(value));
  return new URLSearchParams(Object.fromEntries(pairs)).toString();
}

function normalizeEditPayload(payload: EditPayload): EditPayload {
  if (
    typeof payload.countryNameContains === "string" &&
    payload.countryNameContains.length === 0
  ) {
    return { ...payload, countryNameContains: null };
  }
  return payload;
}

function validatedPayloadToNextState(
  state: t.SP,
  validatedPayload: t.SPEditDeltaValidated
): t.SP {
  console.log({ validatedPayload });
  const nextStatePairs = Object.entries(state).map(([propName, propState]) => {
    const propValidationResult = validatedPayload[propName as keyof typeof state];
    if (propValidationResult === undefined) {
      return [propName, propState];
    }
    if (propValidationResult === null) {
      return [propName, null];
    }
    return [
      propName,
      {
        value: propState?.value || null,
        draft: { ...propValidationResult },
      },
    ];
  });

  return Object.fromEntries(nextStatePairs);
}

function reduceStart(payload: unknown): EffectWriteState {
  const decodedPayload = decode(payload);
  const normalizedPayload = normalizeEditPayload(decodedPayload);
  const validatedPayload = validate(normalizedPayload);
  const nextState = validatedPayloadToNextState(BLANK_STATE, validatedPayload);
  return { type: "writeState", value: nextState };
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

type CitySearchParamsBlank = {
  [P in keyof md.CitySearchParamsShape]: null;
};

const citySearchParamsBlank: CitySearchParamsBlank = {
  countryNameContains: null,
  populationGte: null,
  populationLte: null,
};

function reduceEdit(
  state: md.CitySearchParamsState,
  payload: EditPayload
): EffectWriteState | null {
  const normalizedPayload = normalizeEditPayload(payload);

  const nextDraft = o.safeMerge(state.draft, normalizedPayload);

  const nextState = pipe(
    md.CitySearchParams.decode(nextDraft),
    Either.fold(
      (validationErrors) => {
        const errors = extractErrors(validationErrors);
        return { ...state, draft: nextDraft, errors };
      },
      (validDraft) => {
        return {
          value: validDraft,
          draft: citySearchParamsBlank,
          errors: {},
        };
      }
    )
  );
  console.log({ nextState });
  return { type: "writeState", value: nextState };
}

function reduceSubmit(
  state: t.SP,
  payload: { history: History; baseUrl: string }
): EffectRedirect | null {
  if (isStateValid(state)) {
    return {
      type: "redirect",
      value: {
        history: payload.history,
        url: `${payload.baseUrl}/${urlQueryStringFromState(state)}`,
      },
    };
  }
  return null;
}

function reduceCancel(state: t.SP): EffectWriteState | null {
  return null;
}

function reduce(state: t.SP, event: Event): Effect | Effect[] | null {
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
        writeStateIntoRelayStore(effect.value, environment);
      } else if (effect.type === "redirect") {
        redirectToUrl(effect.value);
      }
    });
  }
}

function lookupStateFromRelayStore(environment: IEnvironment): t.SpState {
  const operation = createOperationDescriptor(getRequest(QUERY), {});
  const response = environment.lookup(operation.fragment);
  const data = response.data as SearchParametersControllerQueryResponse;
  const searchParams = data.uiState?.citySearchParams || null;
  if (searchParams) {
    return searchParams;
  } else {
    return BLANK_STATE;
  }
}

function writeStateIntoRelayStore(state: t.SP, environment: IEnvironment) {
  const request = getRequest(QUERY);
  const operationDescriptor = createOperationDescriptor(request, {});
  let data = {
    __typename: "__Root",
    uiState: {
      citySearchParams: state,
    },
  };
  environment.commitPayload(operationDescriptor, data);
  environment.retain(operationDescriptor);
}

function redirectToUrl({ history, url }: { history: History; url: string }) {
  history.push(url);
}

// For reference. Do not delete.

// function writeSearchParams(searchParams: SearchParameters, environment: IEnvironment) {
//   commitLocalUpdate(environment, (store) => {
//     store.delete(`${ROOT_ID}:uiState:citySearchParams`);
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
