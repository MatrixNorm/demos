import React from "react";
import { graphql, LocalQueryRenderer } from "react-relay";
import styled from "styled-components";
import environment from "theapp/env";
import CitiesBrowserPanel from "theapp/components/CitiesBrowserPanel";

const WithStyle = styled.div`
  .main-page {
    display: flex;
  }

  .search-parameters-panel {
    width: 150px;
  }

  .pagination-panel {
    width: 350px;
  }
`;

export default function App() {
  console.log("App");
  return (
    <LocalQueryRenderer
      query={graphql`
        query AppQuery {
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
      render={({ error, props }) => {
        if (error) return <h3>error</h3>;
        if (!props) return <h3>loading...</h3>;
        return (
          <div>
            <CitiesBrowserPanel searchParams={props.uiState.citySearchParams} environment={environment} />
          </div>
        );
      }}
    />
  );
}
