// @flow

import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "./env";

function XXX({ continent }) {
  return (
    <QueryRenderer
      query={graphql`
        query XXXQuery {
          viewer {
            ...CitiesPagination_cities
          }
        }
      `}
      environment={environment}
      variables={{ continent }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <Pagination />;
      }}
    />
  );
}

export default XXX;
