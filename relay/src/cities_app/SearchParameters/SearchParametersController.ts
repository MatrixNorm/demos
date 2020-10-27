import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  IEnvironment,
  ROOT_ID,
} from "relay-runtime";
import { History } from "history";
import { retainRecord } from "../helpers/relayStore";
import * as t from "./types";
import { SearchParametersControllerQueryResponse } from "__relay__/SearchParametersControllerQuery.graphql";

type Event = StartEvent | EditEvent | SubmitEvent | CancelEvent;

type StartEvent = { type: "start"; payload: unknown };
type EditEvent = { type: "edit"; payload: t.SPEditPayload };
type SubmitEvent = { type: "submit"; payload: { history: History; baseUrl: string } };
type CancelEvent = { type: "cancel" };

type Effect = EffectWriteState | EffectRedirect;

type EffectWriteState = { type: "writeState"; value: t.SP };
type EffectRedirect = { type: "redirect"; value: { history: History; url: string } };

const BLANK_STATE: t.SPBlank = {
  countryNameContains: null,
  populationGte: null,
  populationLte: null,
};

function doesStateHasNoErrors(state: t.SP): state is t.SPNoError {
  return Object.values(state).some((vRecord) => vRecord?.draft?.error);
}

function isEditPayloadEmpty(payload: t.SPEditPayload) {
  return false;
}

function redirectUrlFromState(state: t.SPNoError): string {
  return "";
}

function decode(payload: unknown): t.SPEditPayload {
  return {};
}

function validate(payload: t.SPEditPayload): t.SPEditPayloadValidated {
  function nonEmptyString(value: string): { error: string | null } {
    let trimmed = value.trim();
    return { error: trimmed.length > 0 ? null : "Should not be blank" };
  }

  function nonNegativeNumber(value: number): { error: string | null } {
    return { error: value > 0 ? null : "Should not be negative" };
  }

  const validator: t.SPValidator = {
    countryNameContains: nonEmptyString,
    populationGte: nonNegativeNumber,
    populationLte: nonNegativeNumber,
  };

  let pairs = Object.entries(validator)
    .map(([propName, propValidator]) => {
      let propValue = payload[propName as keyof typeof validator];
      //@ts-ignore
      return propValue ? [propName, propValidator(propValue)] : null;
    })
    .filter(Boolean);

  //@ts-ignore
  return Object.fromEntries(pairs);
}

function validatedPayloadToNextState(
  state: t.SP,
  validatedPayload: t.SPEditPayloadValidated
): t.SP {
  const nextStatePairs = Object.entries(state).map(([propName, propState]) => {
    const propValidationResult = validatedPayload[propName as keyof typeof state];
    if (propValidationResult) {
      return [
        propName,
        {
          value: propState?.value || null,
          draft: propValidationResult.value,
          error: propValidationResult.error,
        },
      ];
    } else {
      return [propName, propState];
    }
  });

  const nextState = Object.fromEntries(nextStatePairs);

  return nextState;
}

function reduceStart(payload: unknown): EffectWriteState {
  const decodedPayload = decode(payload);
  const validatedPayload = validate(decodedPayload);
  const nextState = validatedPayloadToNextState(BLANK_STATE, validatedPayload);
  return { type: "writeState", value: nextState };
}

function reduceEdit(state: t.SP, payload: t.SPEditPayload): EffectWriteState | null {
  if (isEditPayloadEmpty(payload)) {
    return null;
  }
  const validatedPayload = validate(payload);
  const nextState = validatedPayloadToNextState(state, validatedPayload);
  return { type: "writeState", value: nextState };
}

function reduceSubmit(
  state: t.SP,
  payload: { history: History; baseUrl: string }
): EffectRedirect | null {
  if (doesStateHasNoErrors(state)) {
    return {
      type: "redirect",
      value: { history: payload.history, url: redirectUrlFromState(state) },
    };
  }
  return null;
}

function reduceCancel(state: t.SP): EffectWriteState | null {
  return null;
}

function reduce(state: t.SP, event: Event): Effect | Effect[] | null {
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
      return [];
  }
}

// const QUERY = graphql`
//   query SearchParametersControllerQuery {
//     ... on Query {
//       __typename
//     }
//     uiState {
//       citySearchParams {
//         ...SearchParameters_searchParams @relay(mask: false)
//       }
//     }
//   }
// `;

// function lookupState(environment: IEnvironment): State {
//   const operation = createOperationDescriptor(getRequest(QUERY), {});
//   const response = environment.lookup(operation.fragment);
//   const data = response.data as SearchParametersControllerQueryResponse;
//   return {
//     searchParams: purify(data?.uiState?.citySearchParams),
//     editDelta: purify(data?.uiState?.citySearchParamsEditDelta),
//   };
// }

// export function handleEvent(event: Event, environment: IEnvironment) {
//   const state = lookupState(environment);
//   const effects = reduce(state, purifyEvent(event));
//   effects.forEach((eff) => {
//     if (eff.type === "writeSearchParams") {
//       writeSearchParams(eff.value, environment);
//     }
//     if (eff.type === "writeEditDelta") {
//       writeEditDelta(eff.value, environment);
//     }
//   });
// }

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

// function extractFromUrl(urlSearchString: string) {
//   let qp = new URLSearchParams(urlSearchString);
//   return validate(Object.fromEntries(qp));
// }
