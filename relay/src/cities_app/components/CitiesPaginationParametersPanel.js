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
      <select value={""} onChange={e => console.log(e.target.value)}>
        {params.countries.map(country => {
          return (
            <option value={country} key={country}>
              {country}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default createFragmentContainer(CitiesPaginationParametersPanel, {
  params: graphql`
    fragment CitiesPaginationParametersPanel_params on CitiesMetadata {
      countries
      population_lower_bound
      population_upper_bound
      lat_lower_bound
      lat_upper_bound
      lng_lower_bound
      lng_upper_bound
    }
  `
});
