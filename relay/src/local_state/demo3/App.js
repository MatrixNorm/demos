// @flow

//$FlowFixMe
import { LocalQueryRenderer, graphql } from "react-relay";
import React from "react";
import ContinentSelector from "./ContinentSelector";
import CitiesListView from "./CitiesListView";
import environment from "./env";

function App() {
  return (
    <LocalQueryRenderer
      query={graphql`
        query AppQuery {
          __typename
          localSettings {
            ...ContinentSelector_localSettings
            ...CitiesListView_localSettings
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <div>
            <ContinentSelector localSettings={props.localSettings} />
            <CitiesListView localSettings={props.localSettings} />
          </div>
        );
      }}
    />
  );
}

export default App;
