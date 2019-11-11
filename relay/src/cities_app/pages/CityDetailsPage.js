// @flow

import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../env";

export default function CityDetailsPage({ cityId }) {
  return (
    <QueryRenderer
      query={graphql`
        query CityDetailsPageQuery($cityId: ID!) {
          node(id: $cityId) {
            id
            name
            population
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        const { name, population } = props.city;
        return (
          <div>
            <h3>{name}</h3>
            <div>Population: {population}</div>
          </div>
        );
      }}
    />
  );
}
