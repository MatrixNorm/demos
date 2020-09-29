import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  IEnvironment,
  ROOT_ID,
} from "relay-runtime";
import { retainRecord } from "../helpers/relayStore";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { shallowEqual } from "../helpers/object";
import { NukeFragRef } from "../helpers/typeUtils";
import { SearchParametersControllerQueryResponse } from "__relay__/SearchParametersControllerQuery.graphql";

export type SearchParameters = Partial<NukeFragRef<SearchParameters_searchParams>>;

type SearchParametersPurified = {
  purified: true;
  data: SearchParameters;
};

type Event = EditEvent | EnterRouteEvent | SubmitEvent | CancelEvent;
type EditEvent = { type: "edit"; delta: SearchParameters };
type SubmitEvent = { type: "submit" };
type CancelEvent = { type: "cancel" };
type EnterRouteEvent = { type: "routeEnter"; urlSearchString: string };

type EventPurified = {
  rawEvent: Event;
  payload: SearchParametersPurified;
};

type State = {
  searchParams: SearchParametersPurified;
  editDelta: SearchParametersPurified;
};

type Effect =
  | { type: "writeSearchParams"; value: SearchParameters }
  | { type: "writeEditDelta"; value: SearchParameters };

function reduce(state: State, event: EventPurified): Effect[] {
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
      citySearchParamsEditDelta {
        ...SearchParameters_editDelta @relay(mask: false)
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

/**
 * XXX io-ts ???
 */
function extractFromUrl(urlSearchString: string): SearchParametersPurified {
  function goodString(value: string | null) {
    return value && value.trim().length > 0 ? value.trim() : null;
  }

  function goodNumber(value: string | null) {
    return value && Number(value) ? Number(value) : null;
  }

  let qp = new URLSearchParams(urlSearchString);
  let searchParams: NukeFragRef<SearchParameters_searchParams> = {
    countryNameContains: goodString(qp.get("countryNameContains")),
    populationGte: goodNumber(qp.get("populationGte")),
    populationLte: goodNumber(qp.get("populationLte")),
  };
  return purify(searchParams);
}
