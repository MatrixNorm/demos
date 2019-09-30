import { createFragmentContainer, graphql } from "react-relay";
import React from "react";
import City from "./City";

const CityList = ({ cities }) => {
  const { edges } = cities;
  return (
    <div>
      {edges.map(edge => (
        <City key={edge.cursor} city={edge.node} />
      ))}
    </div>
  );
};

export default createFragmentContainer(CityList, {
  cities: graphql`
    fragment CityList_cities on CityConnection {
      edges {
        node {
          id
          ...City_city
        }
        cursor
      }
    }
  `
});
