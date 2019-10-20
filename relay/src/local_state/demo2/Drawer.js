// @flow

import React from "react";
import {QueryRenderer} from "react-relay";
import environment from "./env";

const openStyles = {
  display: "block"
}

const closedStyles = {
  display: "hidden"
}

function Drawer() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query DrawerQuery {
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
          <div style={props.settings.isDrawerOpen ? openStyles : closedStyles}>
            This is a side-menu
          </div>
        );
      }}
    />
  );
}

export default Drawer;