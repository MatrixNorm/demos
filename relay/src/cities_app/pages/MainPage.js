// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "../env";

export default function MainPage() {
  return (
    <QueryRenderer
      query={graphql`
        query MainPageQuery {
          citiesMetadata
          viewer {
            cityFilters
            pinnedCityFilter
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
