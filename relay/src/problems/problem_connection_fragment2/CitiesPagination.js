import { createRefetchContainer, graphql } from "react-relay";
import React from "react";
import CityList from "./CityList";

const CitiesPagination = ({ page, relay }) => {
  function handleNext() {
    relay.refetch(
      {
        first: 3,
        after: page.cities.pageInfo.endCursor
      },
      null,
      () => console.log("refetch done!")
    );
  }

  return (
    <div>
      <CityList edges={page.cities.edges} refetch={relay.refetch} />
      <br />
      <button onClick={handleNext}>NEXT</button>
    </div>
  );
};

export default createRefetchContainer(
  CitiesPagination,
  {
    page: graphql`
      fragment CitiesPagination_page on Query
        @argumentDefinitions(
          first: { type: "Int" }
          after: { type: "String" }
        ) {
        cities(first: $first, after: $after) @connection(key: "CitiesPagination_cities") {
          edges {
            node {
              id
              ...City_city
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
          }
        }
      }
    `
  },
  graphql`
    query CitiesPaginationRefetchQuery($first: Int, $after: String) {
      ...CitiesPagination_page @arguments(first: $first, after: $after)
    }
  `
);
