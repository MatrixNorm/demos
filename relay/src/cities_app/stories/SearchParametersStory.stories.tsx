import * as React from "react";
import { LocalQueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import { SearchParametersPresentational } from "../components/SearchParametersPresentational";
import SearchParameters, { EventT } from "../components/SearchParameters";

export default { title: "cities_app-demo1/SearchParameters" };

// https://github.com/facebook/relay/issues/2394
const mockRefType: any = null;

export const aaa1 = () => {
  const searchParams = {
    countryNameContains: "braz",
    populationGte: 2000000,
    populationLte: 6000000,
    " $refType": mockRefType
  };
  const searchMetadata = {
    populationLowerBound: 80000,
    populationUpperBound: 9000000,
    " $refType": mockRefType
  }
  const dispatch = ([eventType, payload]: EventT) => {
    console.log(eventType, payload);
  };

  return (
    <SearchParametersPresentational
      searchParams={searchParams}
      searchMetadata={searchMetadata}
      dispatch={dispatch}
    />
  );
};

export const bbb2 = () => {
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => {
        return {
          populationLowerBound: 1000,
          populationUpperBound: 9999
        };
      }
    },
    Node: {
      __resolveType() {}
    }
  });
  return (
    <div>
      <SearchParameters
        environment={environment}
        render={({ dispatch, searchParams }) => {
          return (
            <SearchParametersPresentational
              searchParams={searchParams}
              dispatch={dispatch}
            />
          );
        }}
      />
      <br />

      <LocalQueryRenderer
        query={graphql`
          query SearchParametersStoryUiQuery {
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
        `}
        environment={environment}
        variables={{}}
        render={({ props }: { props: any }) => {
          return (
            props && (
              <div>
                {props.uiState
                  ? JSON.stringify(props.uiState.citySearchParams)
                  : JSON.stringify({})}
              </div>
            )
          );
        }}
      />
    </div>
  );
};
