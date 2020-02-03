import * as React from "react";
import { useState, useCallback } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment
} from "relay-runtime";
import { SearchParametersPresentational } from "./SearchParametersPresentational";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";

export interface SearchParams {
  countryNameContains: string | null;
  populationGte: number | null;
  populationLte: number | null;
}

const defaultInput: SearchParams = {
  countryNameContains: "",
  populationGte: 0,
  populationLte: 999999999
};

interface Props {
  metadata: SearchParameters_metadata;
  initialSearchParams: SearchParams;
  environment: IEnvironment;
  refetch: any;
  children: any;
}

function commitSearchParamsInRelaystore(
  searchParams: SearchParams,
  relayEnv: IEnvironment
) {
  const query = graphql`
    query SearchParametersQuery {
      __typename
      uiState {
        id
        citySearchParams {
          countryNameContains
          populationGte
          populationLte
        }
      }
    }
  `;
  const request = getRequest(query);
  const operationDescriptor = createOperationDescriptor(request, {});
  let data = {
    __typename: "__Root",
    uiState: {
      id: "client:UIState",
      citySearchParams: { ...searchParams }
    }
  };
  relayEnv.commitPayload(operationDescriptor, data);
  relayEnv.retain(operationDescriptor);
}

export const SearchParametersContext = React.createContext<SearchParams>({
  countryNameContains: null,
  populationGte: null,
  populationLte: null
});
export const EventDispatchContext = React.createContext<DispatchFunction>(
  ([x, y]) => {}
);

export type Event = ["fieldChange", [string, any]] | ["applyChange"];
export type DispatchFunction = (event: Event) => void;

function SearchParameters({
  metadata,
  initialSearchParams,
  environment,
  refetch,
  children
}: Props) {
  const [searchParams, setSearchParams] = useState({
    ...defaultInput,
    ...{
      populationGte: metadata.populationLowerBound,
      populationLte: metadata.populationUpperBound
    },
    ...(initialSearchParams || {})
  });

  let dispatch = useCallback((event: Event) => {
    if (event[0] === "fieldChange") {
      let [fieldName, fieldValue] = event[1];
      setSearchParams({
        ...searchParams,
        [fieldName]: fieldValue
      });
      return;
    }
    if (event[0] === "applyChange") {
      commitSearchParamsInRelaystore(searchParams, environment);
      refetch({ searchParams });
      return;
    }
  }, []);

  return (
    <SearchParametersContext.Provider value={searchParams}>
      <EventDispatchContext.Provider value={dispatch}>
        {children}
      </EventDispatchContext.Provider>
    </SearchParametersContext.Provider>
  );
}

export default createFragmentContainer(SearchParameters, {
  metadata: graphql`
    fragment SearchParameters_metadata on CitiesMetadata {
      populationLowerBound
      populationUpperBound
    }
  `
});
