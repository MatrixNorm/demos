import { createRefetchContainer, graphql } from "react-relay";
import React from "react";

function City({ city }) {
  return (
    <div>
      <div>
        {city.name} -- <i>{city.population}</i>
      </div>
    </div>
  );
}

function Pagination({ cities, relay }) {
  console.log("Pagination", cities);
  cities = cities.cities;
  const hasNext = cities?.hasNextPage;
  const pageNo = cities?.pageNo;

  function nextPage() {
    hasNext && relay.refetch({ pageNo: pageNo + 1 });
  }

  return (
    <div>
      <ol>
        {cities.nodes.map(city => (
          <City city={city} key={city.id} />
        ))}
      </ol>
      <div>
        <span>{pageNo}</span>
        <button onClick={nextPage}>NEXT</button>
      </div>
    </div>
  );
}

export default createRefetchContainer(
  Pagination,
  {
    cities: graphql`
      fragment Pagination_cities on Query
        @argumentDefinitions(pageNo: { type: "Int!" }) {
        cities(pageNo: $pageNo) {
          nodes {
            id
            name
            population
          }
          pageNo
          hasNextPage
        }
      }
    `
  },
  graphql`
    query PaginationQuery($pageNo: Int!) {
      ...Pagination_cities @arguments(pageNo: $pageNo)
    }
  `
);
