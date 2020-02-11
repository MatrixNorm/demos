import * as React from "react";
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay";
import CitiesPagination from "../components/CitiesPagination";

import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";
import { CitiesPaginationRefetchContainer_cities } from "__relay__/CitiesPaginationRefetchContainer_cities.graphql";

export const loadNextPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let after = nodes[nodes.length - 1].id;
    currentPage.hasNext &&
      relay.refetch(nextVars => {
        return { ...nextVars, after };
      });
  }
};

export const loadPrevPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let before = nodes[0].id;
    currentPage.hasPrev &&
      relay.refetch(prevVars => {
        return { ...prevVars, before };
      });
  }
};

type Props = {
  cities: CitiesPaginationRefetchContainer_cities;
  relay: RelayRefetchProp;
};

export default createRefetchContainer(
  ({ cities, relay }: Props) => {
    console.log(cities);
    return cities.citiesPagination ? (
      <CitiesPagination
        page={cities.citiesPagination}
        loadNextPage={loadNextPage(relay)}
        loadPrevPage={loadPrevPage(relay)}
      />
    ) : (
      <div>ERROR</div>
    );
  },
  {
    cities: graphql`
      fragment CitiesPaginationRefetchContainer_cities on Query
        @argumentDefinitions(
          pageSize: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          searchParams: { type: "CitySearchParamsInput" }
        ) {
        citiesPagination(
          pageSize: $pageSize
          after: $after
          before: $before
          searchParams: $searchParams
        ) {
          ...CitiesPagination_page
        }
      }
    `
  },
  graphql`
    query CitiesPaginationRefetchContainerRefetchQuery(
      $pageSize: Int
      $after: String
      $before: String
      $searchParams: CitySearchParamsInput
    ) {
      ...CitiesPaginationRefetchContainer_cities
        @arguments(
          pageSize: $pageSize
          after: $after
          before: $before
          searchParams: $searchParams
        )
    }
  `
);
