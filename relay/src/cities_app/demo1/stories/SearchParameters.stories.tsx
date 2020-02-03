import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import { SearchParametersPresentational } from "../components/SearchParametersPresentational";
import SearchParameters, { EventT } from "../components/SearchParameters";
import { SearchParametersStoryQuery } from "__relay__/SearchParametersStoryQuery.graphql";

export default { title: "cities_app-demo1/SearchParameters" };

export const aaa1 = () => {
  const searchParams = {
    countryNameContains: "braz",
    populationGte: 1000,
    populationLte: 30000
  };
  const dispatch = ([eventType, payload]: EventT) => {
    console.log(eventType, payload);
  };

  return (
    <SearchParametersPresentational
      searchParams={searchParams}
      dispatch={dispatch}
    />
  );
};

const query = graphql`
  query SearchParametersStoryQuery {
    citiesMetadata {
      ...SearchParameters_metadata
    }
  }
`;

const uiQuery = graphql`
  query SearchParametersStoryUIQuery {
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

const makeEnv = (metadata: any) => {
  return createTestingEnv({
    Query: {
      citiesMetadata: () => {
        return metadata;
      }
    },
    Node: {
      __resolveType() {
        return "City";
      }
    }
  });
};

export const bbb2 = () => {
  const environment = makeEnv({
    populationLowerBound: 2,
    populationUpperBound: 8
  });
  return (
    <>
      <QueryRenderer<SearchParametersStoryQuery>
        query={query}
        environment={environment}
        variables={{}}
        render={({ error, props }) => {
          return (
            props &&
            props.citiesMetadata && (
              <SearchParameters
                metadata={props.citiesMetadata}
                initialSearchParams={{
                  countryNameContains: null,
                  populationGte: null,
                  populationLte: null
                }}
                environment={environment}
                refetch={x => console.log(x)}
                render={({ searchParams, dispatch }) => (
                  <SearchParametersPresentational
                    searchParams={searchParams}
                    dispatch={dispatch}
                  />
                )}
              />
            )
          );
        }}
      />
      <QueryRenderer
        query={uiQuery}
        environment={environment}
        variables={{}}
        render={({ error, props }) => {
          return (
            <div>
              {props.uiState
                ? JSON.stringify(props.uiState)
                : String(props.uiState)}
            </div>
          );
        }}
      />
    </>
  );
};
