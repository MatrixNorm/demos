// @flow

import React from "react";
//$FlowFixMe
import { commitLocalUpdate, ROOT_ID } from "relay-runtime";
import { createFragmentContainer, graphql } from "react-relay";
import CitiesPaginationWrapper from "./CitiesPaginationWrapper";
import environment from "./env";

function CitiesView({ settings }) {
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
      <CitiesPaginationWrapper continent={selectedContinent} />
    </>
  );
}

export default createFragmentContainer(CitiesView, {
  localSettings: graphql`
    fragment CitiesView_localSettings on LocalSettings {
      allContinents
      selectedContinent
    }
  `
});
