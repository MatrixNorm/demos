import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import {
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnAsyncPayloadEnvironment,
} from "../env";
import CitySummary, { defaultData } from "../components/CitySummary";
import { LoadingPlaceholder } from "../LoadingContext";
import { CitySummaryStoryQuery } from "__relay__/CitySummaryStoryQuery.graphql";

export default { title: "cities_app-demo1/CitySummary" };

const query = graphql`
  query CitySummaryStoryQuery($cityId: ID!) {
    city: node(id: $cityId) {
      ...CitySummary_city
    }
  }
`;

export const citySummary = () => {
  const environment = returnPayloadEnvironment({
    city: {
      __typename: "City",
      id: "1",
      name: "Madrid",
      country: "Spain",
      population: 3600000,
    },
  });
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={environment}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};

export const citySummaryLoading = () => {
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={loadingForeverEnvironment()}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        if (props === null) {
          return (
            <LoadingPlaceholder
              query={query}
              variables={{ cityId: "1" }}
              data={{
                city: defaultData,
              }}
              render={({ props }: any) => {
                return props && props.city && <CitySummary city={props.city} />;
              }}
            />
          );
        }
        return null;
      }}
    />
  );
};

export const citySummaryFull = () => {
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={returnAsyncPayloadEnvironment(function*() {
        yield {
          city: {
            __typename: "City",
            id: "1",
            name: "Madrid",
            country: "Spain",
            population: 3600000,
          },
        };
      }, 1000)}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        if (props === null) {
          return (
            <LoadingPlaceholder
              query={query}
              variables={{ cityId: "1" }}
              data={{
                city: defaultData,
              }}
              render={({ props }: any) => {
                return props && props.city && <CitySummary city={props.city} />;
              }}
            />
          );
        }
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};
