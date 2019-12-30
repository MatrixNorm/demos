import React from "react";
import {
  createFragmentContainer,
  graphql,
  LocalQueryRenderer
} from "react-relay";
import { commitLocalUpdate } from "relay-runtime";
import SelectCountryWidget from "./SelectCountryWidget";
import SelectPopulationWidget from "./SelectPopulationWidget";

function CitiesPaginationParametersPanel({ metadata, relay }) {
  function onCountryUpdate(country) {
    commitLocalUpdate(relay.environment, store => {
      const citySearchParams = store.get('client:CitySearchParams');
      citySearchParams.setValue(country, "country");
    });
  }

  function onPopulationUpdate([lower, upper]) {
    commitLocalUpdate(relay.environment, store => {
      const citySearchParams = store.get('client:CitySearchParams');
      citySearchParams.setValue(lower, "populationLowerBound");
      citySearchParams.setValue(upper, "populationUpperBound");
    });
  }

  return (
    <LocalQueryRenderer
      environment={relay.environment}
      query={graphql`
        query CitiesPaginationParametersPanelQuery {
          __typename
          uiState {
            citySearchParams {
              country
              populationUpperBound
              populationLowerBound
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <p>oops..</p>;
        }
        if (!props) return null;

        return (
          <div className="cities-pagination-parameters-panel">
            <SelectCountryWidget
              initialValue={props.uiState.citySearchParams.country}
              relayEnv={relay.environment}
              onNewValue={onCountryUpdate}
            />
            <SelectPopulationWidget
              initialValue={[
                props.uiState.citySearchParams.populationUpperBound,
                props.uiState.citySearchParams.populationLowerBound
              ]}
              relayEnv={relay.environment}
              onNewValue={onPopulationUpdate}
              minRange={metadata.populationLowerBound}
              maxRange={metadata.populationUpperBound}
            />
          </div>
        );
      }}
    />
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
