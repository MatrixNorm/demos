// @flow

import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "./env";

export default function App() {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery {
          citiesMetadata {
            ...CitiesPaginationParametersPanel_params
          }
          viewer {
            cityFilters {
              id
              name
            }
            pinnedCityFilter {
              id
              name
            }
          }
        }
      `}
      environment={environment}
      variables={{ pageNo: 0 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <CitiesPaginationParametersPanel params={props.citiesMetadata} />
            </div>
            <div style={{ flex: 2 }}>
              <CitiesPaginationListPanel />
            </div>
          </div>
        );
      }}
    />
  );
}
