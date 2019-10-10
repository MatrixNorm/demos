// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React from "react";
import City from "./City";

type Props = {|
  relay: RelayRefetchProp,
  cities: any
|};

const CityList = ({ relay, cities }: Props) => {
  const nodes =
    cities && cities.edges
      ? cities.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = cities?.pageInfo.hasPreviousPage;
  const hasNext = cities?.pageInfo.hasNextPage;

  return (
    <div>
      <div>
        {nodes.map(node => (
          <City post={node} key={node.id} />
        ))}
      </div>
      {hasPrev && <button onClick={() => {}}>PREV</button>}
      {hasNext && <button onClick={() => {}}>NEXT</button>}
    </div>
  );
};

export default createRefetchContainer(
  CityList,
  {
    cities: graphql`
      fragment CityList_cities on Query
        @argumentDefinitions(
          first: { type: "Int" }
          after: { type: "String" }
          last: { type: "Int" }
          before: { type: "String" }
        ) {
        allCities(first: $first, after: $after, last: $last, before: $before) {
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
    query CityListRefetchQuery(
      $first: Int
      $after: String
      $last: Int
      $before: String
    ) {
      ...CityList_cities
          @arguments(first: $first, after: $after, last: $last, before: $before)
    }
  `
);
