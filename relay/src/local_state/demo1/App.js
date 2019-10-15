// @flow

import { QueryRenderer, graphql, commitLocalUpdate } from "react-relay";
import { ROOT_ID } from "relay-runtime";
import React from "react";
import environment from "./env";

function App() {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery {
          __typename
          remote
          local
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <>
            <div>{props.local || ""}</div>
            <input
              value={props.local || ""}
              onChange={e =>
                commitLocalUpdate(environment, store => {
                  store.get(ROOT_ID).setValue(e.target.value, "local");
                })
              }
            />
          </>
        );
      }}
    />
  );
}

export default App;
