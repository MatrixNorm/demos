import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import CitySummary from "../components/CitySummary";

export default { title: "cities_app-demo1/CitySummary" };

/**
 * https://github.com/facebook/relay/issues/2394
 *
 */
const mockRefType: any = null;

export const citySummary = () => {
  const environment = createTestingEnv({
    Query: {
      node: (_, { id }) => {
        return { id, name: "Madrid", country: "Spain", population: 3600000 };
      }
    },
    Node: {
      __resolveType(node) {
        return "City";
      }
    }
  });
  return (
    <QueryRenderer
      query={graphql`
        query CitySummaryQuery($cityId: ID!) {
          city: node(id: $cityId) {
            ...CitySummary_city
          }
        }
      `}
      environment={environment}
      variables={{ cityId: "city#1" }}
      render={({ error, props }) => {
        return <CitySummary city={props.city} />;
      }}
    />
  );
};
