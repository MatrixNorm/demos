// @flow

//$FlowFixMe
import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import ContinentSelector from "./ContinentSelector";
import CitiesListView from "./CitiesListView";
import environment from "./env";

function App() {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery {
          localSettings {
            ...ContinentSelector_localSettings
            ...CitiesListView_localSettings
          }
          test
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
