// @flow

import React from "react";
import { Link } from "react-router-dom";
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";

type Props = {
  relay: RelayRefetchProp,
  cities: any
};

const CitiesPagination = ({ relay, cities }: Props) => {
  const nodes = cities?.citiesPagination?.nodes || [];

  const hasPrev = cities?.citiesPagination?.hasPrevPage;
  const hasNext = cities?.citiesPagination?.hasNextPage;
  const pageNo = cities?.citiesPagination?.pageNo;
  console.log(pageNo);

  function prevPagePlease() {
    hasPrev &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo - 1 };
      });
  }

  function nextPagePlease() {
    hasNext &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo + 1 };
      });
  }

  return (
    <div>
      <div>
        {nodes.map(node => (
          <div key={node.id}>
            <h4>
              <Link to={`/city/${node.id}`}>{node.name}</Link>
            </h4>
            <div>{node.country}</div>
            <div>{node.population}</div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevPagePlease}>PREV</button>
        <span>{pageNo}</span>
        <button onClick={nextPagePlease}>NEXT</button>
      </div>
    </div>
  );
};

export default createRefetchContainer(
  CitiesPagination,
  {
    cities: graphql`
      fragment CitiesPagination_cities on Query
        @argumentDefinitions(pageNo: { type: "Int!" }) {
        citiesPagination(pageNo: $pageNo) {
          nodes {
            id
            name
            country
            population
            lat
            lng
          }
          hasNextPage
          hasPrevPage
          pageNo
        }
      }
    `
  },
  graphql`
    query CitiesPaginationRefetchQuery($pageNo: Int!) {
      ...CitiesPagination_cities @arguments(pageNo: $pageNo)
    }
  `
);
