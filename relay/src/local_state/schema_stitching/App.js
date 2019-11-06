// @flow

//$FlowFixMe
import { QueryRenderer, graphql } from "react-relay";
import React from "react";
// import ContinentSelector from "./ContinentSelector";
// import CitiesListView from "./CitiesListView";
import environment from "./env";

function App() {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery {
          localSettings {
            selectedContinent
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <div>{props.localSettings.selectedContinent}</div>;
      }}
    />
  );
}

export default App;
