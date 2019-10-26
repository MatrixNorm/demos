// @flow

import React from "react";
//$FlowFixMe
import { commitLocalUpdate, ROOT_ID } from "relay-runtime";
import { createFragmentContainer, graphql } from "react-relay";
import environment from "./env";

function PaginationWrapper({ settings }) {
  const { availableContinents, selectedContinent } = settings;

  function handleChange(newSelectedContinent) {
    commitLocalUpdate(environment, store => {
      const record = store.get(ROOT_ID).getLinkedRecord("localSettings");
      record.setValue(newSelectedContinent, "selectedContinent");
    });
  }

  return (
    <select value={selectedContinent} onChange={e => handleChange(e.target.value)}>
      {availableContinents.map(continent => {
        return (
          <option value={continent} key={continent}>
            {continent}
          </option>
        );
      })}
    </select>
  );
}

export default createFragmentContainer(PaginationWrapper, {
  localSettings: graphql`
    fragment PaginationWrapper_localSettings on LocalSettings {
      selectedContinent
    }
  `
});
