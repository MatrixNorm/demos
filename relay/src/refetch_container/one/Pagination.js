import { createFragmentContainer, graphql } from "react-relay";
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

function Pagination({ cities, loadNextPage }) {
  const hasNext = cities?.hasNextPage;
  const pageNo = cities?.pageNo;

  function nextPage() {
    hasNext && loadNextPage();
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

export default createFragmentContainer(Pagination, {
  cities: graphql`
    fragment Pagination_cities on CityPagination {
      nodes {
        id
        name
        population
      }
      pageNo
      hasNextPage
    }
  `
});
