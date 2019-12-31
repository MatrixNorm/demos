import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { commitLocalUpdate } from "relay-runtime";
import environment from "theapp/env";
import SelectCountryWidget from "./SelectCountryWidget";
import SelectPopulationWidget from "./SelectPopulationWidget";

export default function CitiesPaginationParametersPanel() {
  return (
    <QueryRenderer
      query={graphql`
        query CitiesPaginationParametersPanelQuery {
          citiesMetadata {
            ...SelectPopulationWidget_meta
          }
          uiState {
            citySearchParams {
              ...SelectCountryWidget_value
              ...SelectPopulationWidget_value
            }
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <Inner
            metadata={props.citiesMetadata}
            searchParams={props.uiState.citySearchParams}
          />
        );
      }}
    />
  );
}

function Inner({ metadata, searchParams, relay }) {
  function onCountryUpdate(country) {
    commitLocalUpdate(relay.environment, store => {
      const citySearchParams = store.get("client:CitySearchParams");
      citySearchParams.setValue(country, "country");
    });
  }

  function onPopulationUpdate([lower, upper]) {
    commitLocalUpdate(relay.environment, store => {
      const citySearchParams = store.get("client:CitySearchParams");
      citySearchParams.setValue(lower, "populationLowerBound");
      citySearchParams.setValue(upper, "populationUpperBound");
    });
  }

  return (
    <div>
      <SelectCountryWidget
        initialValue={searchParams.country}
        relayEnv={relay.environment}
        onNewValue={onCountryUpdate}
      />
      <SelectPopulationWidget
        initialValue={[
          searchParams.populationUpperBound,
          searchParams.populationLowerBound
        ]}
        relayEnv={relay.environment}
        onNewValue={onPopulationUpdate}
        minRange={metadata.populationLowerBound}
        maxRange={metadata.populationUpperBound}
      />
    </div>
  );
}
