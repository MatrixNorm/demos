import * as React from "react";
import { useState } from "react";
import { graphql, QueryRenderer, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment,
} from "relay-runtime";

import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersType = Omit<
  SearchParameters_searchParams,
  " $refType"
>;

export type EventType =
  | ["fieldChange", [keyof SearchParametersType, any]]
  | ["applyChange"];

export type DispatchFunctionType = (event: EventType) => void;

export type RenderCallbackType = ({
  dispatch,
  searchParams,
  searchMetadata,
}: {
  dispatch: DispatchFunctionType;
  searchParams: SearchParametersType;
  searchMetadata: SearchParameters_metadata;
}) => any;

function commitSearchParamsInRelaystore(
  searchParams: SearchParametersType,
  relayEnv: IEnvironment
) {
  const query = graphql`
    query SearchParametersUiQuery {
      __typename
      uiState {
        id
        citySearchParams {
          ...SearchParameters_searchParams
        }
      }
    }
  `;
  console.log(searchParams);
  const request = getRequest(query);
  const operationDescriptor = createOperationDescriptor(request, {});
  let data = {
    __typename: "__Root",
    uiState: {
      id: "client:UIState",
      citySearchParams: { ...searchParams },
    },
  };
  relayEnv.commitPayload(operationDescriptor, data);
  relayEnv.retain(operationDescriptor);
}

type Props = {
  searchMetadata: SearchParameters_metadata;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
  render: RenderCallbackType;
};

export function SearchParameters({
  searchMetadata,
  searchParams,
  environment,
  render,
}: Props) {
  const [localSearchParams, setLocalSearchParams] = useState<
    SearchParametersType
  >({
    countryNameContains: searchParams?.countryNameContains || "",
    populationGte:
      searchParams?.populationGte || searchMetadata.populationLowerBound,
    populationLte:
      searchParams?.populationLte || searchMetadata.populationUpperBound,
  });

  let dispatch = (event: EventType) => {
    if (event[0] === "fieldChange") {
      let [fieldName, fieldValue] = event[1];
      setLocalSearchParams({
        ...localSearchParams,
        [fieldName]: fieldValue,
      });
      return;
    }
    if (event[0] === "applyChange") {
      commitSearchParamsInRelaystore(localSearchParams, environment);
      return;
    }
  };
  return render({
    dispatch,
    searchParams: localSearchParams,
    searchMetadata,
  });
}

const SearchParametersFC = createFragmentContainer(SearchParameters, {
  metadata: graphql`
    fragment SearchParameters_metadata on CitiesMetadata {
      populationLowerBound
      populationUpperBound
    }
  `,
  searchParams: graphql`
    fragment SearchParameters_searchParams on UICitySearchParams {
      countryNameContains
      populationGte
      populationLte
    }
  `,
});

export default ({
  environment,
  render,
}: {
  environment: IEnvironment;
  render: RenderCallbackType;
}) => {
  return (
    <QueryRenderer<SearchParametersQuery>
      query={graphql`
        query SearchParametersQuery {
          citiesMetadata {
            ...SearchParameters_metadata
          }
          uiState {
            citySearchParams {
              ...SearchParameters_searchParams
            }
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
          if (props.citiesMetadata) {
            return (
              props.citiesMetadata && (
                <SearchParametersFC
                  searchMetadata={props.citiesMetadata}
                  searchParams={props.uiState?.citySearchParams || null}
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
