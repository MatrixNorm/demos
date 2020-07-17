import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
  IEnvironment,
  ROOT_ID,
} from "relay-runtime";
import { retainRecord } from "../helpers/relayStore";
import { SearchParameters_editDelta } from "__relay__/SearchParameters_editDelta.graphql";
import { stripEmptyProps } from "../helpers/object";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParametersControllerQueryResponse } from "__relay__/SearchParametersControllerQuery.graphql";

type SearchParametersNullable = NukeFragRef<SearchParameters_editDelta>;
type SearchParameters = NukeNulls<Partial<SearchParametersNullable>> | null;

type Event = EditEvent | EnterRouteEvent;
type EditEvent = { type: "edit"; payload: SearchParameters };
type EnterRouteEvent = { type: "routeEnter"; urlSearchString: string };

type State = {
  searchParams: SearchParameters;
  editDelta: SearchParameters;
};

type Effect =
  | { type: "writeSearchParams"; value: SearchParameters }
  | { type: "writeEditDelta"; value: SearchParameters };

function lookupState(environment: IEnvironment): State {
  const query = graphql`
    query SearchParametersControllerQuery {
      __typename
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
  const operation = createOperationDescriptor(getRequest(query), {});
  const response = environment.lookup(operation.fragment);
  const data = response.data as SearchParametersControllerQueryResponse;
  return {
    searchParams: stripEmptyProps(data?.uiState?.citySearchParams || null),
    editDelta: stripEmptyProps(data?.uiState?.citySearchParamsEditDelta || null),
  };
}

function reduce(state: State, event: Event): Effect[] {
  switch (event.type) {
    case "edit": {
      let editDelta = { ...state.editDelta, ...event.payload };
      return [{ type: "writeEditDelta", value: editDelta }];
    }
    case "routeEnter": {
      let searchParams = extractSearchParametersFromUrl(event.urlSearchString);
      return [
        { type: "writeSearchParams", value: searchParams },
        { type: "writeEditDelta", value: null },
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

function writeEditDelta(delta: SearchParameters, environment: IEnvironment) {}

function writeSearchParams(searchParams: SearchParameters, environment: IEnvironment) {
  commitLocalUpdate(environment, (store) => {
    store.delete(`${ROOT_ID}:uiState:citySearchParams`);
    store.delete(`${ROOT_ID}:uiState:citySearchParamsEditDelta`);
  });
  if (searchParams) {
    commitLocalUpdate(environment, (store) => {
      const searchParamsRecord = store
        .get(ROOT_ID)
        ?.getOrCreateLinkedRecord("uiState", "UIState")
        ?.getOrCreateLinkedRecord("citySearchParams", "UICitySearchParams");
      if (searchParamsRecord) {
        for (let key in searchParams) {
          searchParamsRecord.setValue(searchParams[key as keyof SearchParameters], key);
        }
      }
    });
    retainRecord(
      graphql`
        query SearchParametersControllerRetainQuery {
          __typename
          uiState {
            citySearchParams {
              ...SearchParameters_searchParams
            }
          }
        }
      `,
      environment
    );
  }
}

/**
 * XXX io-ts
 */
function extractSearchParametersFromUrl(
  urlSearchString: string
): Partial<SearchParameters> | null {
  let qp = new URLSearchParams(urlSearchString);
  let searchParams: Writeable<Partial<SearchParameters>> = {};
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
    return searchParams;
  }
  return null;
}
