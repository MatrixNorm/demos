// @flow

import { createPaginationContainer, graphql } from "react-relay";
import React, { useState } from "react";
import City from "../demo1/City";

const CityFeed = ({ relay, cities }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { allCities } = cities;

  const nodes =
    allCities && allCities.edges
      ? allCities.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  function loadMode() {
    setIsLoading(true);
    relay.hasMore() &&
      relay.loadMore(3, () => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <div>
        {nodes.map(node => (
          <City city={node} key={node.id} />
        ))}
      </div>
      {relay.hasMore() && <button onClick={loadMode}>NEXT</button>}
      {isLoading && <span>loading ...</span>}
    </div>
  );
};

export default createPaginationContainer(
  CityFeed,
  {
    cities: graphql`
      fragment CityFeed_cities on Query
        @argumentDefinitions(
          count: { type: "Int" }
          cursor: { type: "String" }
        ) {
        allCities(first: $count, after: $cursor)
          @connection(key: "CityFeed_allCities", filters: []) {
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
    getVariables(props, { count, cursor }, fragmentVariables) {
      console.log(props, { count, cursor }, fragmentVariables);
      return {
        count,
        cursor
      };
    },
    query: graphql`
      query CityFeedPaginationQuery($count: Int!, $cursor: String) {
        ...CityFeed_cities @arguments(count: $count, cursor: $cursor)
      }
    `
  }
);
