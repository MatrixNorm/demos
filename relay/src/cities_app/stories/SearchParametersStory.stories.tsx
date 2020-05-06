import * as React from "react";
import styled from "styled-components";
import { LocalQueryRenderer, graphql } from "react-relay";
import {
  createTestingEnv,
  loadingForeverEnvironment,
  createRelayEnvironment,
  returnAsyncPayloadEnvironment,
} from "../env";
import { SearchParametersPresentational } from "../components/SearchParametersPresentational";
import SearchParameters, { EventType } from "../components/SearchParameters";
import LoadingContext from "../LoadingContext";

export default { title: "cities_app-demo1/SearchParameters" };

// https://github.com/facebook/relay/issues/2394
const mockRefType: any = null;

const Box = styled.div`
  display: flex;
  width: 200px;
  min-height: 200px;
`;

export const Presentational = () => {
  const searchParams = {
    countryNameContains: "braz",
    populationGte: 2000000,
    populationLte: 6000000,
    " $refType": mockRefType,
  };
  const searchMetadata = {
    populationLowerBound: 80000,
    populationUpperBound: 9000000,
    " $refType": mockRefType,
  };
  const dispatch = ([eventType, payload]: EventType) => {
    console.log(eventType, payload);
  };

  return (
    <SearchParametersPresentational
      searchParams={searchParams}
      searchMetadata={searchMetadata}
      dispatch={dispatch}
      showApplyButton={true}
    />
  );
};

export const PresentationalLoadinfPlaceholder = () => {
  const searchParams = {
    countryNameContains: "braz",
    populationGte: 2000000,
    populationLte: 6000000,
    " $refType": mockRefType,
  };
  const searchMetadata = {
    populationLowerBound: 80000,
    populationUpperBound: 9000000,
    " $refType": mockRefType,
  };
  const dispatch = ([eventType, payload]: EventType) => {
    console.log(eventType, payload);
  };
  return (
    <LoadingContext.Provider value={true}>
      <SearchParametersPresentational
        searchParams={searchParams}
        searchMetadata={searchMetadata}
        dispatch={dispatch}
        showApplyButton={false}
      />
    </LoadingContext.Provider>
  );
};

export const success = () => {
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => {
        return {
          populationLowerBound: 100000,
          populationUpperBound: 1000000,
        };
      },
    },
    Node: {
      __resolveType() {},
    },
  });
  return (
    <div>
      <Box>
        <SearchParameters
          environment={environment}
          render={(args) => {
            return <SearchParametersPresentational {...args} />;
          }}
        />
      </Box>
      <br />
      <LocalQueryRenderer
        query={graphql`
          query SearchParametersStoryUiQuery {
            __typename
            uiState {
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

export const noServerData = () => {
  const environment = returnAsyncPayloadEnvironment(function*() {
    yield {
      citiesMetadata: null,
    };
    yield {
      citiesMetadata: {
        populationLowerBound: 100000,
        populationUpperBound: 1000000,
      },
    };
  }, 1000);
  return (
    <Box>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
      />
    </Box>
  );
};

export const serverError = () => {
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => {
        throw new Error("sheisse");
      },
    },
    Node: {
      __resolveType() {},
    },
  });
  return (
    <Box>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
      />
    </Box>
  );
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  return (
    <Box>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
      />
    </Box>
  );
};

export const full = () => {
  const environment = createRelayEnvironment({ timeout: 1000 });
  return (
    <Box>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
      />
    </Box>
  );
};
