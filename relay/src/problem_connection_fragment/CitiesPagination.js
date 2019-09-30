import { createRefetchContainer, graphql } from "react-relay";
import React from "react";
import CitiesList from "./CitiesList";

const CitiesPagination = ({ cities, relay }) => {

  function handleNext() {
    relay.refetch(
      {
        first: 3,
        after: cities.cities.pageInfo.endCursor,
      },
      null,
      () => console.log('refetch done!')
    )

  }

  return (
    <div>
      <CitiesList conn={cities.cities} />
      <button onClick={handleNext}>NEXT</button>
    </div>
  );
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
          ...CitiesList_conn
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
