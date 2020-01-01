import { createRefetchContainer, graphql } from "react-relay";
import React from "react";

function City({ city }) {
  return (
    <div>
      <h4>{city.name}</h4>
      <div>{city.country}</div>
    </div>
  );
}

function CitiesPagination({ relay, cities }) {
  const hasPrev = cities?.hasPrevPage;
  const hasNext = cities?.hasNextPage;
  const pageNo = cities?.pageNo;

  function prevPage() {
    hasPrev &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo - 1 };
      });
  }

  function nextPage() {
    hasNext &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo + 1 };
      });
  }

  return (
    <div>
      <ol>
        {cities.nodes.map(city => (
          <City city={city} key={city.id} />
        ))}
      </ol>
      <div>
        <button onClick={prevPage}>PREV</button>
        <span>{pageNo}</span>
        <button onClick={nextPage}>NEXT</button>
      </div>
    </div>
  );
}

export default createRefetchContainer(
  CitiesPagination,
  {
    cities: graphql`
      fragment CitiesPagination_cities on CitiesPagination {
        nodes {
          id
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
    query CitiesPaginationRefetchQuery(
      $pageNo: Int!
      $pageSize: Int!
      $searchParams: CitySearchParamsInput
    ) {
      citiesPagination(
        pageNo: $pageNo
        pageSize: $pageSize
        searchParams: $searchParams
      ) {
        ...CitiesPagination_cities
      }
    }
  `
);

// @argumentDefinitions(
//           pageNo: { type: "Int!" }
//           pageSize: { type: "Int!" }
//           searchParams: { type: "CitySearchParamsInput" }
//         )
