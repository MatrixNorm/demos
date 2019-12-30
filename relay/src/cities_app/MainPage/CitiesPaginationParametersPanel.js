import { createFragmentContainer, graphql } from "react-relay";
import React from "react";

import SelectCountryWidget from "./SelectCountryWidget";
import SelectPopulationWidget from "./SelectPopulationWidget";

function CitiesPaginationParametersPanel({ metadata, relay, dispatch }) {
  return (
    <div className="cities-pagination-parameters-panel">
      <SelectCountryWidget
        relayEnv={relay.environment}
        onNewValue={value => dispatch({ field: "country", value })}
      />
      <SelectPopulationWidget
        relayEnv={relay.environment}
        onNewValue={value => dispatch({ field: "pupulation", value })}
        minRange={metadata.populationLowerBound}
        maxRange={metadata.populationUpperBound}
      />
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
