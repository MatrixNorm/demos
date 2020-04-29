import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  IEnvironment,
} from "relay-runtime";
import {
  createTestingEnv,
  loadingForeverEnvironment,
  returnPayloadEnvironment,
} from "../env";
import CitySummary, { defaultData } from "../components/CitySummary";
import { CitySummaryStoryQuery } from "__relay__/CitySummaryStoryQuery.graphql";

export default { title: "cities_app-demo1/CitySummary" };

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
      query={graphql`
        query CitySummaryStoryQuery($cityId: ID!) {
          city: node(id: $cityId) {
            ...CitySummary_city
          }
        }
      `}
      environment={environment}
      variables={{ cityId: "" }}
      render={({ props }) => {
        console.log(props.city);
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};

export const citySummarySkeleton = () => {
  const env = returnPayloadEnvironment(defaultData);
  const query = graphql`
    query CitySummaryStory2Query($cityId: ID!) {
      city: node(id: $cityId) {
        ...CitySummary_city
      }
    }
  `;
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, { cityId: "" });
  let data = {
    city: {
      __typename: "City",
      id: "1",
      name: "aaaaaa",
      country: "bbbbbbbb",
      population: 1000000,
    },
  };
  env.commitPayload(operation, data);
  console.log(env.getStore().getSource());
  let response = env.lookup(operation.fragment);
  console.log(response);
  return null;
  // return (
  //   <QueryRenderer<CitySummaryStoryQuery>
  //     query={query}
  //     environment={loadingForeverEnvironment()}
  //     variables={{ cityId: "" }}
  //     render={({ props }) => {
  //       console.log(response.data.city);
  //       if (props === null) {
  //         return <CitySummary city={response.data.city} />;
  //       }
  //       return null;
  //     }}
  //   />
  // );
};
