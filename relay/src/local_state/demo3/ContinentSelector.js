// @flow

import React from "react";
//$FlowFixMe
import { commitLocalUpdate, ROOT_ID } from "relay-runtime";
import { createFragmentContainer, graphql } from "react-relay";

import environment from "./env";

function ContinentSelector({ localSettings }) {
  const { allContinents, selectedContinent } = localSettings;

  function handleChange(newSelectedContinent) {
    commitLocalUpdate(environment, store => {
      const record = store.get(ROOT_ID).getLinkedRecord("localSettings");
      record.setValue(newSelectedContinent, "selectedContinent");
    });
  }

  return (
    <select
      value={selectedContinent}
      onChange={e => handleChange(e.target.value)}
    >
      {allContinents.map(continent => {
        return (
          <option value={continent} key={continent}>
            {continent}
          </option>
        );
      })}
    </select>
  );
}

export default createFragmentContainer(ContinentSelector, {
  localSettings: graphql`
    fragment ContinentSelector_localSettings on LocalSettings {
      allContinents
      selectedContinent
    }
  `
});
