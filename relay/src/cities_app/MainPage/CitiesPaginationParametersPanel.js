import { createFragmentContainer, graphql } from "react-relay";
import React from "react";

import Main from "./SelectCountryWidget";

function CitiesPaginationParametersPanel({ metadata, relay }) {
  console.log(relay);
  return (
    <div>
      <Main relayEnvironment={relay.environment} />
    </div>
  );
}

export default createFragmentContainer(CitiesPaginationParametersPanel, {
  metadata: graphql`
    fragment CitiesPaginationParametersPanel_metadata on CitiesMetadata {
      populationLowerBound
      populationUpperBound
      latLowerBound
      latUpperBound
      lngLowerBound
      lngUpperBound
    }
  `
});
