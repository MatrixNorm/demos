// @flow

import React from "react";
import { LocalQueryRenderer, graphql } from "react-relay";
import environment from "./env";

const openStyles = {
  display: "none"
};

const closedStyles = {
  display: "block"
};

export default function MainSection() {
  return (
    <LocalQueryRenderer
      environment={environment}
      query={graphql`
        query MainSectionQuery {
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
            This is the main content. Sorry, but we're suffering from content
            drought!
          </main>
        );
      }}
    />
  );
}
