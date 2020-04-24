import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { graphql, QueryRenderer, createFragmentContainer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment,
} from "relay-runtime";
import LoadingIndicator from "../elements/LoadingIndicator";

import { NukeFragRef, NukeNulls } from "../typeUtils";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersType = NukeNulls<
  NukeFragRef<SearchParameters_searchParams>
>;

export type SearchMetadataType = NukeFragRef<SearchParameters_searchMetadata>;

export type EventType =
  | ["fieldChange", [keyof SearchParametersType, any]]
  | ["applyChange"];

export type DispatchFunctionType = (event: EventType) => void;

export type RenderCallbackArgsType = {
  dispatch: DispatchFunctionType;
  searchParams: SearchParametersType;
  searchMetadata: SearchMetadataType;
  showApplyButton: Boolean;
};
export type RenderCallbackType = (args: RenderCallbackArgsType) => any;

function commitSearchParamsInRelaystore(
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
    populationGte:
      searchParams.populationGte || searchMetadata.populationLowerBound,
    populationLte:
      searchParams.populationLte || searchMetadata.populationUpperBound,
  };
}

type Props = {
  searchMetadata: SearchMetadataType;
  searchParams: NukeFragRef<SearchParameters_searchParams>;
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
    NukeFragRef<SearchParameters_searchParams>
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
      setLocalSearchParams((prevState) => ({
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
  searchMetadata: SearchParameters_searchMetadata;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
  render: RenderCallbackType;
};

const SearchParametersFC = createFragmentContainer(
  function(props: PropsFC) {
    const { searchMetadata } = props;
    const searchParams = props.searchParams || {
      countryNameContains: null,
      populationGte: null,
      populationLte: null,
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default function SearchParametersOuterComponent({
  environment,
  render,
}: {
  environment: IEnvironment;
  render: RenderCallbackType;
}) {
  const [reload, setReload] = useState(false);
  return (
    <Container>
      {reload ? (
        <div>
          <div>something went wrong</div>
          <button onClick={() => setReload(false)}>Reload</button>
        </div>
      ) : (
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
              setReload(true);
              return;
            }
            if (!props) {
              return <LoadingIndicator />;
            }
            if (!props.citiesMetadata) {
              setReload(true);
              return;
            }
            return (
              <SearchParametersFC
                searchMetadata={props.citiesMetadata}
                searchParams={props.uiState?.citySearchParams || null}
                environment={environment}
                render={render}
              />
            );
          }}
        />
      )}
    </Container>
  );
}
