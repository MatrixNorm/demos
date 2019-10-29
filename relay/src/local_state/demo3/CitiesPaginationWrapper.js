// @flow

import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import CitiesPagination from "./CitiesPagination";
import environment from "./env";

function CitiesPaginationWrapper({ continent }: any) {
  return (
    <QueryRenderer
      query={graphql`
        query CitiesPaginationWrapperQuery(
          $continent: Continent!
          $pageNo: Int!
        ) {
          viewer {
            ...CitiesPagination_cities
              @arguments(continent: $continent, pageNo: $pageNo)
          }
        }
      `}
      environment={environment}
      variables={{ continent, pageNo: 0 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <CitiesPagination cities={props.viewer} />;
      }}
    />
  );
}

export default CitiesPaginationWrapper;
