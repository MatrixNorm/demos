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
import { shallowEqual, compact, Compacted } from "../helpers/object";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParametersControllerQueryResponse } from "__relay__/SearchParametersControllerQuery.graphql";

export type SearchParametersNullable = NukeFragRef<SearchParameters_searchParams>;
type SearchParameters = NukeNulls<SearchParametersNullable>;

type Event = EditEvent | EnterRouteEvent | SubmitEvent | CancelEvent;
type EditEvent = { type: "edit"; payload: Partial<t.SearchParametersOnlyValues> };
type SubmitEvent = { type: "submit"; payload: { history: History; baseUrl: string } };
type CancelEvent = { type: "cancel" };
type EnterRouteEvent = { type: "routeEnter"; urlSearchString: string };

type Effect =
  | { type: "writeSearchParams"; value: SearchParameters }
  | { type: "redirectToUrl"; value: { history: History; url: string } };

function reduce(state: State, event: Event): Effect[] {
  let eventType = event.rawEvent.type;
  let eventPayload = event.payload.data;
  let searchParams = state.searchParams.data;
  let editDelta = state.editDelta.data;

  switch (eventType) {
    case "edit": {
      let _editDelta = { ...editDelta, ...eventPayload };
      if (shallowEqual(_editDelta, editDelta)) {
        return [];
      }
      return [{ type: "writeEditDelta", value: editDelta }];
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

// XXX
export function purify(
  input: SearchParameters | null | undefined
): SearchParametersPurified {
  if (!input) {
    return { purified: true, data: {} };
  }
  let copy = { ...input };
  let { countryNameContains } = copy;
  if (countryNameContains && countryNameContains.trim().length === 0) {
    delete copy["countryNameContains"];
  }
  let denulled = Object.fromEntries(
    Object.entries(copy).filter(([_, v]) => v !== undefined && v !== null)
  );
  return { purified: true, data: denulled };
}

function purifyEvent(event: Event): EventPurified {
  let payload: SearchParametersPurified = { purified: true, data: {} };
  switch (event.type) {
    case "edit": {
      payload = purify(event.delta);
      break;
    }
    case "routeEnter": {
      payload = extractFromUrl(event.urlSearchString);
      break;
    }
  }
  return {
    rawEvent: event,
    payload,
  };
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

function writeEditDelta(delta: SearchParameters, environment: IEnvironment) {
  commitLocalUpdate(environment, (store) => {
    store.delete(`${ROOT_ID}:uiState:citySearchParamsEditDelta`);
  });
  if (Object.keys(delta).length > 0) {
    commitLocalUpdate(environment, (store) => {
      const record = store
        .get(ROOT_ID)
        ?.getOrCreateLinkedRecord("uiState", "UIState")
        ?.getOrCreateLinkedRecord("citySearchParamsEditDelta", "UICitySearchParams");
      if (record) {
        for (let key in delta) {
          record.setValue(delta[key as keyof SearchParameters], key);
        }
      }
    });
    retainRecord(QUERY, environment);
  }
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

type SearchParametersRequired = NukeNulls<SearchParameters>;
type SearchParametersValidator = spec.Validator<SearchParametersRequired>;

function validate(rawObject: unknown) {
  const searchParametersValidator: SearchParametersValidator = {
    countryNameContains: spec.nonEmptyString,
    populationGte: spec.positiveNumber,
    populationLte: spec.positiveNumber,
  };
  return spec.validatePartially(searchParametersValidator, rawObject);
}

function extractFromUrl(urlSearchString: string) {
  let qp = new URLSearchParams(urlSearchString);
  return validate(Object.fromEntries(qp));
}
