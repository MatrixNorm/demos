import { createFragmentContainer, graphql } from "react-relay";
import React from "react";

function CitiesPaginationListingPanel({ cities, relay }) {
  return <div>{JSON.stringify(cities)}</div>;
}

export default createFragmentContainer(CitiesPaginationListingPanel, {
  cities: graphql`
    fragment CitiesPaginationListingPanel_cities on CitiesPagination
      @argumentDefinitions(
        pageNo: { type: "Int!" }
        pageSize: { type: "Int!" }
        searchParams: { type: "CitySearchParamsInput" }
      ) {
      nodes {
        name
        country
        population
        lat
        lng
      }
      pageNo
      hasNextPage
      hasPrevPage
    }
  `
});
