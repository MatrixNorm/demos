import { createRefetchContainer, graphql } from "react-relay";
import React from "react";
import CitiesPage from "./CitiesPage";

const CitiesPagination = ({ cities, relay }) => {
  return <CitiesPage conn={cities.cities} refetch={relay.refetch} />;
};

export default createRefetchContainer(
  CitiesPagination,
  {
    cities: graphql`
      fragment CitiesPagination_cities on Query
        @argumentDefinitions(
          first: { type: "Int" }
          after: { type: "String" }
        ) {
        cities(first: $first, after: $after) {
          ...CitiesPage_conn
        }
      }
    `
  },
  graphql`
    query CitiesPaginationRefetchQuery($first: Int, $after: String) {
      ...CitiesPagination_cities @arguments(first: $first, after: $after)
    }
  `
);
