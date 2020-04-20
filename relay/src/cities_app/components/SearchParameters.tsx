import * as React from "react";
import { useState } from "react";
import { graphql, QueryRenderer, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment,
} from "relay-runtime";

import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersType = Omit<
  {
    [P in keyof SearchParameters_searchParams]: NonNullable<
      SearchParameters_searchParams[P]
    >;
  },
  " $refType"
>;

export type EventType =
  | ["fieldChange", [keyof SearchParametersType, any]]
  | ["applyChange"];

export type DispatchFunctionType = (event: EventType) => void;

export type RenderCallbackArgsType = {
  dispatch: DispatchFunctionType;
  searchParams: SearchParametersType;
  searchMetadata: SearchParameters_searchMetadata;
  showApplyButton: Boolean;
};
export type RenderCallbackType = (args: RenderCallbackArgsType) => any;

function commitSearchParamsInRelaystore(
  searchParams: SearchParameters_searchParams,
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
  searchParams: SearchParameters_searchParams,
  searchMetadata: SearchParameters_searchMetadata
): SearchParametersType {
  return {
    countryNameContains: searchParams.countryNameContains || "",
    populationGte:
      searchParams.populationGte || searchMetadata.populationLowerBound,
    populationLte:
      searchParams.populationLte || searchMetadata.populationUpperBound,
  };
}

type Props = {
  searchMetadata: SearchParameters_searchMetadata;
  searchParams: SearchParameters_searchParams;
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
    SearchParameters_searchParams
  >(searchParams);

  function isLocalDiff(): Boolean {
    return (
      Object.keys(searchParams)
        //@ts-ignore
        .map((attr) => searchParams[attr] !== localSearchParams[attr])
        .some(Boolean)
    );
  }

  function dispatch(event: EventType) {
    if (event[0] === "fieldChange") {
      let [fieldName, fieldValue] = event[1];
      setLocalSearchParams(prevState => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
      return;
    }
    if (event[0] === "applyChange") {
      commitSearchParamsInRelaystore(localSearchParams, environment);
      return;
    }
  }
  return render({
    dispatch,
    searchParams: presentationalTransformation(
      localSearchParams,
      searchMetadata
    ),
    searchMetadata,
    showApplyButton: isLocalDiff(),
  });
}

type PropsFC = {
  searchMetadata: SearchParameters_searchMetadata | null;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
  render: RenderCallbackType;
};

const SearchParametersFC = createFragmentContainer(
  function SearchParameters_(props: PropsFC) {
    const { searchMetadata } = props;
    if (!searchMetadata) {
      return <div>data error</div>;
    }
    const searchParams = props.searchParams || {
      countryNameContains: null,
      populationGte: null,
      populationLte: null,
      " $refType": "SearchParameters_searchParams",
    };
    return <SearchParameters {...{ ...props, searchParams, searchMetadata }} />;
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
      render={({ error, props }) => {
        if (error) {
          return <div>NETWORK ERROR</div>;
        }
        if (props) {
          return (
            <SearchParametersFC
              searchMetadata={props.citiesMetadata || null}
              searchParams={props.uiState?.citySearchParams || null}
              environment={environment}
              render={render}
            />
          );
        }
        return <div>loading...</div>;
      }}
    />
  );
};
