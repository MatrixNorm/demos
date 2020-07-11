import * as React from "react";
import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { createOperationDescriptor, getRequest, IEnvironment } from "relay-runtime";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";

import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersNullableType = NukeFragRef<SearchParameters_searchParams>;
export type SearchParametersType = NukeNulls<SearchParametersNullableType>;
export type SearchMetadataType = NukeFragRef<SearchParameters_searchMetadata>;

export type EventType =
  | [
      "fieldChange",
      (
        | ["countryNameContains", string]
        | ["populationGte", number]
        | ["populationLte", number]
      )
    ]
  | ["applyChange"];

export type RenderCallbackArgsType = {
  dispatch: (event: EventType) => void;
  searchParams: SearchParametersType;
  localSearchParams: SearchParametersNullableType;
  searchMetadata: SearchMetadataType;
  showApplyButton: Boolean;
};
export type RenderCallbackType = (args: RenderCallbackArgsType) => any;

function commitSearchParamsInRelayStore(
  searchParams: NukeFragRef<SearchParameters_searchParams>,
  relayEnv: IEnvironment
) {
  const query = graphql`
    query SearchParametersUiQuery {
      __typename
      uiState {
        citySearchParams {
          ...SearchParameters_searchParams
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
      citySearchParams: { ...searchParams },
    },
  };
  relayEnv.commitPayload(operationDescriptor, data);
  relayEnv.retain(operationDescriptor);
}

/**
 * Transformation that maps null into appropriate value for display in input element.
 * E.g. empty string for text input or lower bound for range input, etc.
 */
function presentationalTransformation(
  searchParams: NukeFragRef<SearchParameters_searchParams>,
  searchMetadata: SearchMetadataType
): SearchParametersType {
  return {
    countryNameContains: searchParams.countryNameContains || "",
    populationGte: searchParams.populationGte || searchMetadata.populationLowerBound,
    populationLte: searchParams.populationLte || searchMetadata.populationUpperBound,
  };
}

type HookProps = {
  searchMetadata: SearchMetadataType;
  searchParams: NukeFragRef<SearchParameters_searchParams>;
  environment: IEnvironment;
};

function useSearchParameters({ searchParams, searchMetadata, environment }: HookProps) {
  const [localSearchParams, setLocalSearchParams] = useState<
    SearchParametersNullableType
  >(searchParams);

  function dispatch(event: EventType) {
    if (event[0] === "fieldChange") {
      let [fieldName, fieldValue] = event[1];
      setLocalSearchParams((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
      return;
    }
    if (event[0] === "applyChange") {
      commitSearchParamsInRelayStore(localSearchParams, environment);
      return;
    }
  }

  const localDiff = Object.keys(searchParams)
    //@ts-ignore
    .map((attr) => searchParams[attr] !== localSearchParams[attr])
    .some(Boolean);

  const displayableSearchParams = presentationalTransformation(
    localSearchParams,
    searchMetadata
  );

  return { dispatch, displayableSearchParams, localDiff, localSearchParams };
}

type PropsFC = {
  searchMetadata: SearchParameters_searchMetadata;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
  render: RenderCallbackType;
};

const SearchParametersFC = createFragmentContainer(
  function(props: PropsFC) {
    const {
      dispatch,
      displayableSearchParams,
      localDiff,
      localSearchParams,
    } = useSearchParameters({
      searchParams: {
        ...{
          countryNameContains: null,
          populationGte: null,
          populationLte: null,
        },
        ...(props.searchParams || {}),
      },

      searchMetadata: props.searchMetadata,
      environment: props.environment,
    });
    return props.render({
      dispatch,
      searchParams: displayableSearchParams,
      localSearchParams,
      searchMetadata: props.searchMetadata,
      showApplyButton: localDiff,
    });
  },
  {
    searchMetadata: graphql`
      fragment SearchParameters_searchMetadata on CitiesMetadata {
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
  }
);

export const defaultData = {
  searchMetadata: {
    populationLowerBound: 1000,
    populationUpperBound: 1000000,
  },
  searchParams: {
    countryNameContains: "",
    populationGte: 1000,
    populationLte: 1000000,
  },
};

export default function({
  environment,
  render,
}: {
  environment: IEnvironment;
  render: RenderCallbackType;
}) {
  return (
    <LoadingPlaceholderQueryRenderer<SearchParametersQuery>
      query={graphql`
        query SearchParametersQuery {
          citiesMetadata {
            ...SearchParameters_searchMetadata
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
      placeholderData={{
        citiesMetadata: { ...defaultData.searchMetadata },
        uiState: {
          citySearchParams: { ...defaultData.searchParams },
        },
      }}
      render={({ props }) => {
        return (
          props &&
          props.citiesMetadata && (
            <SearchParametersFC
              searchMetadata={props.citiesMetadata}
              searchParams={props.uiState?.citySearchParams || null}
              environment={environment}
              render={render}
            />
          )
        );
      }}
    />
  );
}
