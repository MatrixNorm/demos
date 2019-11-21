// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "../env";

function CitiesPaginationListPanel() {
  return (
    <QueryRenderer
      query={graphql`
        query CitiesPaginationListPanelQuery {
          citiesPagination(pageNo: 0) {
            nodes {
              id
              name
              country
            }
            pageNo
            hasNextPage
            hasPrevPage
          }
        }
      `}
      environment={environment}
      variables={{ pageNo: 0 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <div>
            shit
          </div>
        );
      }}
    />
  );
}

export default CitiesPaginationListPanel;
