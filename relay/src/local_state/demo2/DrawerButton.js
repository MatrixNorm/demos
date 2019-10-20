// @flow

import React from "react";
import { commitLocalUpdate } from "relay-runtime";
import { createFragmentContainer, graphql } from "react-relay";
import environment from "./env";

function DrawerButton({ settings }) {
  const openOrClose = settings.isDrawerOpen ? "Close" : "Open";
  return (
    <button
      onClick={() => {
        commitLocalUpdate(environment, store => {
          const record = store.getRoot().getLinkedRecord("settings");
          record.setValue(!settings.isDrawerOpen, "isDrawerOpen");
        });
      }}
    >
      {openOrClose} the side-menu.
    </button>
  );
}

export default createFragmentContainer(DrawerButton, {
  settings: graphql`
    fragment DrawerButton on Settings {
      isDrawerOpen
    }
  `
});
