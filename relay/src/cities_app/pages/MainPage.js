// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "../env";

export default function MainPage() {
  return (
    <QueryRenderer
      query={graphql`
        query MainPageQuery {
          citiesMetadata {
            countries
            population_lower_bound
            population_upper_bound
            lat_lower_bound
            lat_upper_bound
            lng_lower_bound
            lng_upper_bound
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
        return <div>ok boomer</div>;
      }}
    />
  );
}
