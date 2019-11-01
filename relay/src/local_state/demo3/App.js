// @flow

//$FlowFixMe
import { LocalQueryRenderer, graphql } from "react-relay";
import React from "react";
import CitiesView from "./CitiesView";
import environment from "./env";

function App() {
  return (
    <LocalQueryRenderer
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
