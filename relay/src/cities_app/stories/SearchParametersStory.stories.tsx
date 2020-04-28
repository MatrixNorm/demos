import * as React from "react";
import { LocalQueryRenderer, graphql } from "react-relay";
import {
  createTestingEnv,
  loadingForeverEnvironment,
  createRelayEnvironment,
} from "../env";
import {
  SearchParametersPresentational,
  SearchParametersPresentationalLoading,
} from "../components/SearchParametersPresentational";
import SearchParameters, { EventType } from "../components/SearchParameters";

export default { title: "cities_app-demo1/SearchParameters" };

// https://github.com/facebook/relay/issues/2394
const mockRefType: any = null;

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

export const PresentationalSkeleton = () => {
  return <SearchParametersPresentational />;
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
      <div style={{ width: "200px" }}>
        <SearchParameters
          environment={environment}
          render={(args) => {
            return <SearchParametersPresentational {...args} />;
          }}
          loading={SearchParametersPresentationalLoading}
        />
      </div>
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
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => null,
    },
    Node: {
      __resolveType() {},
    },
  });
  return (
    <div style={{ width: "200px" }}>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
        loading={() => <SearchParametersPresentational />}
      />
    </div>
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
    <div style={{ width: "200px" }}>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
        loading={() => <SearchParametersPresentational />}
      />
    </div>
  );
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  return (
    <div style={{ width: "200px" }}>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
        loading={() => <SearchParametersPresentational />}
      />
    </div>
  );
};

export const full = () => {
  const environment = createRelayEnvironment({ timeout: 1000 });
  return (
    <div style={{ width: "200px" }}>
      <SearchParameters
        environment={environment}
        render={(args) => {
          return <SearchParametersPresentational {...args} />;
        }}
        loading={() => <SearchParametersPresentational />}
      />
    </div>
  );
};
