// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import CitiesView from "./CitiesView";
import environment from "./env";

function App() {
  return (
    <QueryRenderer
      // __typename: https://github.com/facebook/relay/issues/2471
      query={graphql`
        query AppQuery {
          __typename
          localSettings {
            ...CitiesView_localSettings
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <CitiesView localSettings={props.localSettings} />;
      }}
    />
  );
}

export default App;
