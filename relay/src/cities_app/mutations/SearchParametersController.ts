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
import { compact, Compacted, merge } from "../helpers/object";
import { NukeFragRef, NukeNulls, Writeable } from "../helpers/typeUtils";
import { SearchParametersControllerQueryResponse } from "__relay__/SearchParametersControllerQuery.graphql";

export type SearchParameters = NukeNulls<NukeFragRef<SearchParameters_searchParams>>;

type Event = EditEvent | EnterRouteEvent;
type EditEvent = { type: "edit"; payload: Partial<SearchParameters> };
type SubmitEvent = { type: "submit" };
type CancelEvent = { type: "cancel" };
type EnterRouteEvent = { type: "routeEnter"; urlSearchString: string };

type State = {
  searchParams: SearchParameters;
  editDelta: Partial<SearchParameters>;
};

type Effect =
  | { type: "writeSearchParams"; value: SearchParameters }
  | { type: "writeEditDelta"; value: Partial<SearchParameters> };

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
    searchParams: compact(data?.uiState?.citySearchParams),
    editDelta: compact(data?.uiState?.citySearchParamsEditDelta),
  };
}

function reduce(state: State, event: Event): Effect[] {
  switch (event.type) {
    case "edit": {
      let editDelta = merge(state.editDelta, event.payload);
      if (!editDelta.countryNameContains) {
        delete editDelta["countryNameContains"];
      }
      return [{ type: "writeEditDelta", value: editDelta }];
    }
    case "routeEnter": {
      let searchParams = extractSearchParametersFromUrl(event.urlSearchString);
      return [
        { type: "writeSearchParams", value: searchParams },
        { type: "writeEditDelta", value: compact<SearchParameters>(null) },
      ];
    }
    default:
      return [];
  }
}

export function handleEvent(event: Event, environment: IEnvironment) {
  const state = lookupState(environment);
  const effects = reduce(state, event);
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
function extractSearchParametersFromUrl(urlSearchString: string): SearchParameters {
  let qp = new URLSearchParams(urlSearchString);
  let searchParams = {} as Writeable<SearchParameters>;
  if (qp.has("countryNameContains")) {
    let value = qp.get("countryNameContains");
    if (value) {
      searchParams["countryNameContains"] = value;
    }
  }
  if (qp.has("populationGte")) {
    let value = Number(qp.get("populationGte"));
    if (value) {
      searchParams["populationGte"] = value;
    }
  }
  if (qp.has("populationLte")) {
    let value = Number(qp.get("populationLte"));
    if (value) {
      searchParams["populationLte"] = value;
    }
  }
  if (Object.keys(searchParams).length > 0) {
    return compact(searchParams);
  }
  return compact<SearchParameters>(null);
}
