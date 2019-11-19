// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import CitiesPagination from "../components/CitiesPagination";
import environment from "../env";

export default function HomePage() {
  return (
    <QueryRenderer
      query={graphql`
        query HomePageQuery($pageNo: Int!) {
          viewer {
            ...CitiesPagination_cities
              @arguments(continent: $continent, pageNo: $pageNo)
          }
        }
      `}
      environment={environment}
      variables={{ pageNo: 0 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <CitiesPagination cities={props.viewer} />;
      }}
    />
  );
}
