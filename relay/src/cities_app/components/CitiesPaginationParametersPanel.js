// @flow

import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import type { CitiesPaginationParametersPanel_params } from "../__generated__/CitiesPaginationParametersPanel_params.graphql";

type Props = {
  params: CitiesPaginationParametersPanel_params
};

function CitiesPaginationParametersPanel({ params }: Props) {
  return (
    <div>
      <div>
        <span>Country</span>
        <input className="bp3-input" type="text" />
      </div>
      <div>
        <span>Population</span>
        <input className="bp3-input" type="text" />
        <input className="bp3-input" type="text" />
      </div>
    </div>
  );
}

export default createFragmentContainer(CitiesPaginationParametersPanel, {
  params: graphql`
    fragment CitiesPaginationParametersPanel_params on CitiesMetadata {
      population_lower_bound
      population_upper_bound
      lat_lower_bound
      lat_upper_bound
      lng_lower_bound
      lng_upper_bound
    }
  `
});
