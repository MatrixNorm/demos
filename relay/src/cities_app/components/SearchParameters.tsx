import * as React from "react";
import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";

import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersType = NukeFragRef<SearchParameters_searchParams>;
export type SearchParametersPresentationalType = NukeNulls<SearchParametersType>;
export type SearchMetadataType = NukeFragRef<SearchParameters_searchMetadata>;

export type EventType =
  | ["countryNameContains", string]
  | ["populationGte", number]
  | ["populationLte", number];

export type RenderCallbackArgsType = {
  dispatch: (event: EventType) => void;
  searchParams: SearchParametersPresentationalType;
  searchMetadata: SearchMetadataType;
  showApplyButton: Boolean;
  url: string;
};
export type RenderCallbackType = (args: RenderCallbackArgsType) => any;

function queryURL(searchParams: SearchParametersType) {
  let obj = new URLSearchParams("");
  for (let k in searchParams) {
    // @ts-ignore
    searchParams[k] && obj.append(k, searchParams[k]);
  }
  return obj.toString();
}

/**
 * Transformation that maps null into appropriate value for display in input element.
 * E.g. empty string for text input or lower bound for range input, etc.
 */
function presentationalTransformation(
  searchParams: SearchParametersType,
  searchMetadata: SearchMetadataType
): SearchParametersPresentationalType {
  return {
    countryNameContains: searchParams.countryNameContains || "",
    populationGte: searchParams.populationGte || searchMetadata.populationLowerBound,
    populationLte: searchParams.populationLte || searchMetadata.populationUpperBound,
  };
}

type HookProps = {
  searchMetadata: SearchMetadataType;
  searchParams: SearchParametersType;
  environment: IEnvironment;
};

function useSearchParameters({ searchParams, searchMetadata }: HookProps) {
  const [localSearchParams, setLocalSearchParams] = useState<SearchParametersType>(
    searchParams
  );
  const { url } = useRouteMatch();

  function dispatch(event: EventType) {
    let [fieldName, fieldValue] = event;
    setLocalSearchParams((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  }

  const localDiff = Object.keys(searchParams)
    //@ts-ignore
    .map((attr) => searchParams[attr] !== localSearchParams[attr])
    .some(Boolean);

  const displayableSearchParams = presentationalTransformation(
    localSearchParams,
    searchMetadata
  );

  return {
    dispatch,
    displayableSearchParams,
    localDiff,
    url: `${url}?${queryURL(localSearchParams)}`,
  };
}

type PropsFC = {
  searchMetadata: SearchParameters_searchMetadata;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
  render: RenderCallbackType;
};

const SearchParametersFC = createFragmentContainer(
  function(props: PropsFC) {
    const { dispatch, displayableSearchParams, localDiff, url } = useSearchParameters({
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
      searchMetadata: props.searchMetadata,
      showApplyButton: localDiff,
      url,
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
