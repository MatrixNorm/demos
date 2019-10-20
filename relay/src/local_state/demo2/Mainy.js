// @flow

import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "./env";

const openStyles = {
  display: "none"
}

const closedStyles = {
  display: "block"
}

function Mainy() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query MainyQuery {
          __typename
          settings {
            isDrawerOpen
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <div>loading...</div>;
        return (
          <main style={props.settings.isDrawerOpen ? openStyles : closedStyles}>
            This is the main content. Sorry, but 
            we're suffering from content drought!
          </main>
        );
      }}
    />
  );
}

export default Mainy;
