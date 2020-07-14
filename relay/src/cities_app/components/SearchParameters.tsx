import * as React from "react";
import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { commitLocalUpdate, IEnvironment, ROOT_ID } from "relay-runtime";
import { useRouteMatch } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import { toQueryURL } from "../helpers/object";
import { retainRecord } from "../helpers/relayStore";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersType = NukeFragRef<SearchParameters_searchParams>;
export type SearchParametersNonNullType = NukeNulls<SearchParametersType>;
export type SearchMetadataType = NukeFragRef<SearchParameters_searchMetadata>;

export type EventType =
  | ["countryNameContains", string]
  | ["population", { lower: number; upper: number }];

export type RenderCallbackArgsType = {
  dispatch: (event: EventType) => void;
  searchParams: SearchParametersNonNullType;
  searchMetadata: SearchMetadataType;
  showApplyButton: Boolean;
  url: string;
};
export type RenderCallbackType = (args: RenderCallbackArgsType) => any;

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

/**
 * Transformation that maps null into appropriate value for display in input element.
 * E.g. empty string for text input or lower bound for range input, etc.
 */
function presentationalTransformation(
  searchParams: SearchParametersType,
  searchMetadata: SearchMetadataType
): SearchParametersNonNullType {
  return {
    countryNameContains: searchParams.countryNameContains || "",
    populationGte: searchParams.populationGte || searchMetadata.populationLowerBound,
    populationLte: searchParams.populationLte || searchMetadata.populationUpperBound,
  };
}

function useSearchParameters({
  searchParams,
  searchMetadata,
}: {
  searchMetadata: SearchMetadataType;
  searchParams: SearchParametersType;
}) {
  const [prevSearchParams, setPrevSearchParams] = useState<SearchParametersType | null>(
    null
  );
  const [localSearchParams, setLocalSearchParams] = useState<SearchParametersType>(
    searchParams
  );
  const { url } = useRouteMatch();

  if (JSON.stringify(searchParams) !== JSON.stringify(prevSearchParams)) {
    setPrevSearchParams(searchParams);
    setLocalSearchParams(searchParams);
  }

  function dispatch(event: EventType) {
    if (event[0] === "population") {
      setLocalSearchParams((prevState) => ({
        ...prevState,
        populationGte: event[1].lower,
        populationLte: event[1].upper,
      }));
      return;
    }
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
    url: `${url}?${toQueryURL(localSearchParams)}`,
  };
}

export function commitSearchParamsInRelayStore(
  searchParams: Partial<SearchParametersNonNullType> | null,
  environment: IEnvironment
) {
  commitLocalUpdate(environment, (store) => {
    store.delete(`${ROOT_ID}:uiState:citySearchParams`);
  });
  if (searchParams) {
    commitLocalUpdate(environment, (store) => {
      const searchParamsRecord = store
        .get(ROOT_ID)
        ?.getOrCreateLinkedRecord("uiState", "UIState")
        ?.getOrCreateLinkedRecord("citySearchParams", "UICitySearchParams");
      if (searchParamsRecord) {
        for (let key in searchParams) {
          searchParamsRecord.setValue(
            searchParams[key as keyof SearchParametersNonNullType],
            key
          );
        }
      }
    });
    retainRecord(
      graphql`
        query SearchParametersRetainQuery {
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
