// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import ContinentSelector from "../components/ContinentSelector";
import CitiesListView from "../components/CitiesListView";
import clientEnv from "../clientEnv";

function CitiesListPage() {
  return (
    <QueryRenderer
      query={graphql`
        query CitiesListPageQuery {
          localSettings {
            id
            ...ContinentSelector_localSettings
            ...CitiesListView_localSettings
          }
        }
      `}
      environment={clientEnv}
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

export default CitiesListPage;
