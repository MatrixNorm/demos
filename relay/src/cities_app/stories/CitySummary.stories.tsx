import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import {
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnPayloadAsyncEnvironment,
} from "../env";
import CitySummary, { defaultData } from "../components/CitySummary";
import {
  LoadingPlaceholder,
  LoadingPlaceholderQueryRenderer,
} from "../verysmart/LoadingContext";
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
    <LoadingPlaceholderQueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={loadingForeverEnvironment()}
      variables={{ cityId: "1" }}
      placeholderData={{
        city: defaultData,
      }}
      render={({ props }) => {
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};

export const citySummaryFull = () => {
  return (
    <LoadingPlaceholderQueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={returnPayloadAsyncEnvironment(function*() {
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
      placeholderData={{
        city: defaultData,
      }}
      render={({ props }) => {
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};
