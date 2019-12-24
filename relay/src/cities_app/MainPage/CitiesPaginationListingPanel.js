import { createRefetchContainer, graphql } from "react-relay";
import React from "react";

function CitiesPaginationListingPanel({ cities }) {
  return <div>{JSON.stringify(cities)}</div>;
}

export default createRefetchContainer(
  CitiesPaginationListingPanel,
  {
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
  },
  graphql`
    query CitiesPaginationListingPanelRefetchQuery(
      $pageNo: Int!
      $pageSize: Int!
      $searchParams: CitySearchParamsInput
    ) {
      citiesPagination(
        pageNo: $pageNo
        pageSize: $pageSize
        searchParams: $searchParams
      ) {
        ...CitiesPaginationListingPanel_cities
          @arguments(
            pageNo: $pageNo
            pageSize: $pageSize
            searchParams: $searchParams
          )
      }
    }
  `
);
