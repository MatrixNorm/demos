// @flow

import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "./env";
import AutoComplete from './AutoComplete'

export default function App() {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery {
          __typename
        }
      `}
      environment={environment}
      variables={{ pageNo: 0 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <AutoComplete />
        );
      }}
    />
  );
}
