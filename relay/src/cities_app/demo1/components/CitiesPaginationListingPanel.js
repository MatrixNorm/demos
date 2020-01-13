import React from "react";
import { LocalQueryRenderer, graphql } from "react-relay";
import environment from "theapp/env";
import CitiesPaginationListingPanelInner from "./CitiesPaginationListingPanelInner";

export default function CitiesPaginationListingPanel() {
  console.log("CitiesPaginationListingPanel");
  return (
    <LocalQueryRenderer
      query={graphql`
        query CitiesPaginationListingPanelQuery {
          __typename
          uiState {
            citySearchParams {
              country
            }
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) <h3>{error}</h3>;
        if (!props) return null;
        return (
          <CitiesPaginationListingPanelInner
            searchParams={props.uiState.citySearchParams}
            relayEnv={environment}
          />
        );
      }}
    />
  );
}
