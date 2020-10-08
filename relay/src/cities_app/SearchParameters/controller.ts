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
import * as spec from "../helpers/spec";
import * as t from "./types";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParametersControllerQueryResponse } from "__relay__/SearchParametersControllerQuery.graphql";

export type SearchParametersNullable = NukeFragRef<SearchParameters_searchParams>;

type Event = EditEvent | EnterRouteEvent | SubmitEvent | CancelEvent;
type EditEvent = { type: "edit"; payload: t.SearchParametersEditPayload };
type SubmitEvent = { type: "submit"; payload: { history: History; baseUrl: string } };
type CancelEvent = { type: "cancel" };
type EnterRouteEvent = { type: "routeEnter"; urlSearchString: string };

type Effect =
  | { type: "writeSearchParams"; value: t.SearchParameters }
  | { type: "redirectToUrl"; value: { history: History; url: string } };

function decodePayload(
  payload: t.SearchParametersEditPayload
): Partial<t.SearchParametersOnlyValues> | null {
  return null;
}

function validatePayload(payload: Partial<t.SearchParametersOnlyValues>) {
  function nonEmptyString(value: string): { value: string; error: string | null } {
    let trimmed = value.trim();
    return trimmed.length > 0
      ? { value, error: null }
      : { value, error: "Should not be blank" };
  }

  function positiveNumber(value: number): { value: number; error: string | null } {
    return value > 0 ? { value, error: null } : { value, error: "Should be positive" };
  }

  const searchParametersValidator: t.SearchParametersValidator = {
    countryNameContains: nonEmptyString,
    populationGte: positiveNumber,
    populationLte: positiveNumber,
  };
  return spec.validatePartially(searchParametersValidator, payload);
}

function reduceEdit(
  state: t.SearchParameters,
  payload: t.SearchParametersEditPayload
): Effect[] | undefined {
  let decoded = decodePayload(payload);
  if (decoded === null) return;

  let validated = validatePayload(decoded);
  let nextState = { ...state };

  for (let prop in validated) {
    let validatedResult = validated[prop as keyof typeof validated];
    if (validatedResult) {
      //@ts-ignore
      nextState[prop] = {
        //@ts-ignore
        value: nextState[prop].value,
        draft: validatedResult.value,
        error: validatedResult.error,
      };
    }
  }
  return [{ type: "writeSearchParams", value: nextState }];
}

function reduce(state: t.SearchParameters, event: Event): Effect[] | undefined {
  switch (event.type) {
    case "edit": {
      return reduceEdit(state, event.payload);
    }
    case "routeEnter": {
      return [
        { type: "writeSearchParams", value: eventPayload },
        { type: "writeEditDelta", value: {} },
      ];
    }
    case "submit": {
      return [
        { type: "writeSearchParams", value: { ...searchParams, ...editDelta } },
        { type: "writeEditDelta", value: {} },
      ];
    }
    case "cancel": {
      return [{ type: "writeEditDelta", value: {} }];
    }
    default:
      return [];
  }
}

const QUERY = graphql`
  query SearchParametersControllerQuery {
    ... on Query {
      __typename
    }
    uiState {
      citySearchParams {
        ...SearchParameters_searchParams @relay(mask: false)
      }
    }
  }
`;

function lookupState(environment: IEnvironment): State {
  const operation = createOperationDescriptor(getRequest(QUERY), {});
  const response = environment.lookup(operation.fragment);
  const data = response.data as SearchParametersControllerQueryResponse;
  return {
    searchParams: purify(data?.uiState?.citySearchParams),
    editDelta: purify(data?.uiState?.citySearchParamsEditDelta),
  };
}

export function handleEvent(event: Event, environment: IEnvironment) {
  const state = lookupState(environment);
  const effects = reduce(state, purifyEvent(event));
  effects.forEach((eff) => {
    if (eff.type === "writeSearchParams") {
      writeSearchParams(eff.value, environment);
    }
    if (eff.type === "writeEditDelta") {
      writeEditDelta(eff.value, environment);
    }
  });
}

function writeSearchParams(searchParams: SearchParameters, environment: IEnvironment) {
  commitLocalUpdate(environment, (store) => {
    store.delete(`${ROOT_ID}:uiState:citySearchParams`);
  });
  if (Object.keys(searchParams).length > 0) {
    commitLocalUpdate(environment, (store) => {
      const record = store
        .get(ROOT_ID)
        ?.getOrCreateLinkedRecord("uiState", "UIState")
        ?.getOrCreateLinkedRecord("citySearchParams", "UICitySearchParams");
      if (record) {
        for (let key in searchParams) {
          record.setValue(searchParams[key as keyof SearchParameters], key);
        }
      }
    });
    retainRecord(QUERY, environment);
  }
}

function extractFromUrl(urlSearchString: string) {
  let qp = new URLSearchParams(urlSearchString);
  return validate(Object.fromEntries(qp));
}
