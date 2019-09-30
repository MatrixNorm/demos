import { createFragmentContainer, graphql } from "react-relay";
import React from "react";
import City from "./City";

const CitiesList = ({ conn }) => {
  const { edges } = conn;
  return (
    <div>
      <div>
        {edges.map(edge => <City key={edge.cursor} city={edge.node} />)}
      </div>
    </div>
  );
};

export default createFragmentContainer(CitiesList, {
  conn: graphql`
    fragment CitiesList_conn on CityConnection {
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
  `
});
