// @flow

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp
} from "react-relay";
import React from "react";
import City from "./City";
import type { CityList_cities } from "./__generated__/CityList_cities.graphql";

type Props = {|
  relay: RelayRefetchProp,
  cities: CityList_cities
|};

const CityList = ({ relay, cities }: Props) => {
  console.log(cities);
  const { allCities } = cities;
  const nodes =
    allCities && allCities.edges
      ? allCities.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = allCities?.pageInfo.hasPreviousPage;
  const hasNext = allCities?.pageInfo.hasNextPage;

  return (
    <div>
      <div>
        {nodes.map(node => (
          <City city={node} key={node.id} />
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
        allCities(first: $first, after: $after, last: $last, before: $before)
          @connection(key: "CityList_allCities") {
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
