// @flow

import React from "react";
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";

const CitiesPagination = ({ relay, cities }) => {
  const nodes = cities && cities.nodes ? cities.nodes : [];

  const hasPrev = cities?.hasPreviousPage;
  const hasNext = cities?.hasNextPage;
  const pageNo = cities?.pageNo;

  function prevPagePlease() {
    hasPrev && relay.refetch(prevVars => {
      return {...prevVars, pageNo: pageNo + 1}
    });
  }

  function nextPagePlease() {
    hasNext && relay.refetch(prevVars => {
      return {...prevVars, pageNo: pageNo - 1}
    });
  }

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
  CitiesPagination,
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
