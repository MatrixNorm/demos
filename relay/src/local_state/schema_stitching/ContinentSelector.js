// @flow

import React from "react";
//$FlowFixMe
import { ROOT_ID } from "relay-runtime";
import { commitMutation, createFragmentContainer, graphql } from "react-relay";

const mutation = graphql`
  mutation ContinentSelectorMutation($input: UpdateSelectedContinentInput!) {
    updateSelectedContinent(input: $input) @local {
      continent
      clientMutationId
    }
  }
`;

function ContinentSelector({ relay, localSettings }) {
  const { allContinents, selectedContinent } = localSettings;

  function handleChange(continent) {
    const variables = { input: { continent } };
    commitMutation(relay.environment, {
      mutation,
      variables,
      updater: store => {
        const payload = store.getRootField("updateSelectedContinent");
        const continent = payload.getValue("continent");
        store
          .get("localSettings#singleton")
          .setValue(continent, "selectedContinent");
      },
      onCompleted: (response, errors) => {
        console.log(response);

      },
      onError: err => console.error(err)
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
