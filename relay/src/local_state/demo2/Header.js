// @flow

import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import DrawerButton from "./DrawerButton";
import environment from "./env";

function Header() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query HeaderQuery {
          user {
            name
          }
          settings {
            ...DrawerButton_settings
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <div>loading...</div>;

        return (
          <header>
            <DrawerButton settings={props.settings} />
            <span>Welcome back, {props.user.name}.</span>
          </header>
        );
      }}
    />
  );
}

export default Header;
