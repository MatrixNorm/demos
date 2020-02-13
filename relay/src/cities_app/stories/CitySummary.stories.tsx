import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import CitySummary, { CitySummarySkeleton } from "../components/CitySummary";
import { CitySummaryStoryQuery } from "__relay__/CitySummaryStoryQuery.graphql";

export default { title: "cities_app-demo1/CitySummary" };

export const citySummary = () => {
  const environment = createTestingEnv({
    Query: {
      node: (_: any, { id }: { id: any }) => {
        return { id, name: "Madrid", country: "Spain", population: 3600000 };
      }
    },
    Node: {
      __resolveType() {
        return "City";
      }
    }
  });
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={graphql`
        query CitySummaryStoryQuery($cityId: ID!) {
          city: node(id: $cityId) {
            ...CitySummary_city
          }
        }
      `}
      environment={environment}
      variables={{ cityId: "city#1" }}
      render={({ error, props }) => {
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};

export const citySummarySkeleton = () => {
  return <CitySummarySkeleton />;
};
