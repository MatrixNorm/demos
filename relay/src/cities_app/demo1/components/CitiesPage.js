import React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import City from "./City";

export function CitiesPage_({ page, onPrev, onNext }) {
  return (
    <div>
      <ol>
        {page.nodes.map(city => (
          <City city={city} key={city.id} />
        ))}
      </ol>
      <div>
        {page.hasPrev && <button onClick={onPrev}>PREV</button>}
        <span>{page.pageNo}</span>
        {page.hasNext && <button onClick={onNext}>NEXT</button>}
      </div>
    </div>
  );
}

export default createFragmentContainer(CitiesPage_, {
  page: graphql`
    fragment CitiesPage_page on CitiesPagination {
      pageNo
      hasNextPage
      hasPrevPage
      nodes {
        ...City_city
      }
    }
  `
});
