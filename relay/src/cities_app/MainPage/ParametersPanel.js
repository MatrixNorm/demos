import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "theapp/env";

export default function ParametersPanel() {
  return (
    <QueryRenderer
      query={graphql`
        query MainPageQuery {
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
        return <div></div>;
      }}
    />
  );
}
