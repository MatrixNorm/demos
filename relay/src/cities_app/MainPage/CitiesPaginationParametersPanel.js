import { createFragmentContainer, graphql } from "react-relay";
import React from "react";

function CitiesPaginationParametersPanel({ metadata }) {
  return <div>{JSON.stringify(metadata)}</div>;
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
