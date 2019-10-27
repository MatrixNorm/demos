// @flow

import React from "react";
//$FlowFixMe
import { commitLocalUpdate, ROOT_ID } from "relay-runtime";
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay";
import environment from "./env";

function PaginationWrapper({ settings }) {
  const { allContinents, selectedContinent } = settings;

  function handleChange(newSelectedContinent) {
    commitLocalUpdate(environment, store => {
      const record = store.get(ROOT_ID).getLinkedRecord("localSettings");
      record.setValue(newSelectedContinent, "selectedContinent");
    });
  }

  return (
    <>
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
      <XXX continent={selectedContinent} />
    </>
  );
}

export default createFragmentContainer(PaginationWrapper, {
  localSettings: graphql`
    fragment PaginationWrapper_localSettings on LocalSettings {
      allContinents
      selectedContinent
    }
  `
});
