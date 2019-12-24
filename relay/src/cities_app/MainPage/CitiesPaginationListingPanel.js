import { createRefetchContainer, graphql } from "react-relay";
import React from "react";

function CitiesPaginationListingPanel({ cities }) {
  return <div>{JSON.stringify(cities)}</div>;
}

export default createRefetchContainer(
  CitiesPaginationListingPanel,
  {
    cities: graphql`
      fragment CitiesPaginationListingPanel_cities on CitiesPagination {
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
      citiesPagination {
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
