import { createPaginationContainer, graphql } from "react-relay";
import * as React from "react";
import { useState } from "react";
import City from "./City";
import { CityFeed_cities } from "./__generated__/CityFeed_cities.graphql";

interface Props {
  cities: CityFeed_cities;
  relay: any;
}

const CityFeed = ({ relay, cities }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { allCities } = cities;

  // TS: https://github.com/microsoft/TypeScript/pull/29955
  // .filter(Boolean) does not work like in flow
  const nodes =
    allCities && allCities.edges
      ? allCities.edges.map(edge => (edge ? edge.node : null)) //.filter(Boolean)
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
        {nodes.map(node => {
          if (node) {
            return <City city={node} key={node.id} />;
          }
        })}
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
