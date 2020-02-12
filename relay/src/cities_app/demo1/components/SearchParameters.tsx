import * as React from "react";
import { useState } from "react";
import { graphql, QueryRenderer, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment
} from "relay-runtime";

import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";
import * as t from "../types.codegen";

type Props = {
  metadata: SearchParameters_metadata;
  searchParams: SearchParameters_searchParams;
  environment: IEnvironment;
  render: any;
};

export type EventT = ["fieldChange", [string, any]] | ["applyChange"];
export type DispatchT = (event: EventT) => void;

const defaultInput: t.UiCitySearchParams = {
  countryNameContains: "",
  populationGte: 0,
  populationLte: 999999999
};

function commitSearchParamsInRelaystore(
  searchParams: t.UiCitySearchParams,
  relayEnv: IEnvironment
) {
  const query = graphql`
    query SearchParametersUiQuery {
      __typename
      uiState {
        id
        ...SearchParameters_searchParams
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

export function SearchParameters({
  metadata,
  searchParams,
  environment,
  render
}: Props) {
  const [localSearchParams, setLocalSearchParams] = useState({
    ...defaultInput,
    ...{
      populationGte: metadata.populationLowerBound,
      populationLte: metadata.populationUpperBound
    },
    ...(searchParams || {})
  });

  let dispatch = (event: EventT) => {
    if (event[0] === "fieldChange") {
      let [fieldName, fieldValue] = event[1];
      setLocalSearchParams({
        ...localSearchParams,
        [fieldName]: fieldValue
      });
      return;
    }
    if (event[0] === "applyChange") {
      commitSearchParamsInRelaystore(localSearchParams, environment);
      return;
    }
  };
  return render({ dispatch, localSearchParams });
}

const SearchParametersFC = createFragmentContainer(SearchParameters, {
  metadata: graphql`
    fragment SearchParameters_metadata on CitiesMetadata {
      populationLowerBound
      populationUpperBound
    }
  `,
  searchParams: graphql`
    fragment SearchParameters_searchParams on UIState {
      citySearchParams {
        countryNameContains
        populationGte
        populationLte
      }
    }
  `
});

export default ({
  environment,
  render
}: {
  environment: IEnvironment;
  render: any;
}) => {
  return (
    <QueryRenderer<SearchParametersQuery>
      query={graphql`
        query SearchParametersQuery {
          citiesMetadata {
            ...SearchParameters_metadata
          }
          uiState {
            ...SearchParameters_searchParams
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>NETWORK ERROR</div>;
        }
        if (props) {
          if (props.citiesMetadata && props.uiState) {
            return (
              props.citiesMetadata && (
                <SearchParametersFC
                  metadata={props.citiesMetadata}
                  searchParams={props.uiState}
                  environment={environment}
                  render={render}
                />
              )
            );
          } else {
            return <div>GRAPHQL ERROR</div>;
          }
        }
        return <div>loading...</div>;
      }}
    />
  );
};
