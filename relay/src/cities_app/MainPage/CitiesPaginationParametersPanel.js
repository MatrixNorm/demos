import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "theapp/env";
import SelectCountryWidget from "./SelectCountryWidget";
import SelectPopulationWidget from "./SelectPopulationWidget";

export default function CitiesPaginationParametersPanel() {
  console.log("CitiesPaginationParametersPanel");
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
          <div>
            <SelectCountryWidget value={props.uiState.citySearchParams} />
            <SelectPopulationWidget
              value={props.uiState.citySearchParams}
              meta={props.citiesMetadata}
            />
          </div>
        );
      }}
    />
  );
}
