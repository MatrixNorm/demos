import * as React from "react";
import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment
} from "relay-runtime";
import { SearchParametersPresentational } from "./SearchParametersPresentational";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";

interface SearchParams {
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

function SearchParameters({
  metadata,
  initialSearchParams,
  environment,
  refetch
}: Props) {
  const [searchParams, setSearchParams] = useState({
    ...defaultInput,
    ...{
      populationGte: metadata.populationLowerBound,
      populationLte: metadata.populationUpperBound
    },
    ...(initialSearchParams || {})
  });

  function applySearchParams() {
    commitSearchParamsInRelaystore(searchParams, environment);
    refetch({ searchParams });
  }

  let onFieldChange = (fieldName: string, fieldValue: any) =>
    setSearchParams({
      ...searchParams,
      [fieldName]: fieldValue
    });

  return (
    <SearchParametersPresentational
      fieldValues={searchParams}
      onFieldChange={onFieldChange}
      onButtonClick={applySearchParams}
    />
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
