// @flow

import React from "react";
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";

const Pagination = ({ relay, cities }) => {
  const nodes = cities && cities.nodes ? cities.nodes : [];

  const hasPrev = cities?.hasPreviousPage;
  const hasNext = cities?.hasNextPage;

  function prevPagePlease() {}

  function nextPagePlease() {}

  return (
    <div>
      <div>
        {nodes.map(node => (
          <div key={node.id}>
            <h4>node.name</h4>
            <div>node.population</div>
          </div>
        ))}
      </div>
      {hasPrev && <button onClick={prevPagePlease}>PREV</button>}
      {hasNext && <button onClick={nextPagePlease}>NEXT</button>}
    </div>
  );
};

export default createRefetchContainer(
  Pagination,
  {
    cities: graphql`
      fragment CitiesPagination_cities on Viewer
        @argumentDefinitions(
          continent: { type: "Continent!" }
          pageNo: { type: "Int!" }
        ) {
        cities(continent: $continent, pageNo: $pageNo) {
          nodes {
            id
            name
            population
          }
          hasNextPage
          hasPrevPage
        }
      }
    `
  },
  graphql`
    query PaginationRefetchQuery($continent: Continent!, $pageNo: Int!) {
      viewer {
        cities {
          ...CitiesPagination_cities
            @arguments(continent: $continent, pageNo: $pageNo)
        }
      }
    }
  `
);
