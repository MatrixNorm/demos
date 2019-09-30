import { createFragmentContainer, graphql } from "react-relay";
import React from "react";
import City from "./City";

const CitiesPage = ({ conn, refetch }) => {
  const { edges, pageInfo } = conn;

  function handleNext() {
    refetch(
      {
        first: 3,
        after: pageInfo.endCursor
      },
      null,
      () => console.log("refetch done!")
    );
  }

  return (
    <div>
      <div>
        {edges.map(edge => (
          <City key={edge.cursor} city={edge.node} />
        ))}
      </div>
      <br />
      <button onClick={handleNext}>NEXT</button>
    </div>
  );
};

export default createFragmentContainer(CitiesPage, {
  conn: graphql`
    fragment CitiesPage_conn on CityConnection {
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
