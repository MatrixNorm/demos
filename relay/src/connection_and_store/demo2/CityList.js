// @flow

import {
  createPaginationContainer,
  graphql,
  type RelayPaginationProp
} from "react-relay";
import React from "react";
import City from "../demo1/City";
import type { CityList_cities } from "./__generated__/CityList_cities.graphql";

type Props = {|
  relay: RelayPaginationProp,
  cities: CityList_cities
|};

const CityList = ({ relay, cities }: Props) => {
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

  function onNext() {
    allCities &&
      hasNext &&
      relay.refetch({ first: 3, after: allCities.pageInfo.endCursor });
  }

  return (
    <div>
      <div>
        {nodes.map(node => (
          <City city={node} key={node.id} />
        ))}
      </div>
      {hasPrev && <button onClick={() => {}}>PREV</button>}
      {hasNext && <button onClick={onNext}>NEXT</button>}
    </div>
  );
};

export default createPaginationContainer(
  CityList,
  {
    cities: graphql`
      fragment CityList_cities on Query
        @argumentDefinitions(
          first: { type: "Int" }
          after: { type: "String" }
        ) {
        allCities(first: $first, after: $after)
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
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.cities && props.cities.allCities;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      };
    },
    getVariables(props, { first, after }, fragmentVariables) {
      return {
        first,
        after,
      };
    },
    query: graphql`
      # Pagination query to be fetched upon calling 'loadMore'.
      # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
      query CityListPaginationQuery(
        $first: Int!
        $after: String
      ) {
        cities: node(id: $userID) {
          ...Feed_user @arguments(count: $count, cursor: $cursor, orderBy: $orderBy)
        }
      }
    `
  }
);
