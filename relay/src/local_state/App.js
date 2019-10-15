// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "./env";

function App() {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery {
          __typename
          localValue
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>  ;
        return <div>{props.localValue}</div>;
      }}
    />
  );
}

export default App;
