import * as React from "react";
import { graphql, QueryRenderer, LocalQueryRenderer } from "react-relay";
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

export const citySummarySkeleton = () => {
  const env = returnPayloadEnvironment(defaultData);
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, { cityId: "1" });
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
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={loadingForeverEnvironment()}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        console.log(response.data.city);
        if (props === null) {
          return <CitySummary city={response.data.city} />;
        }
        return null;
      }}
    />
  );
};

export const citySummarySkeleton2 = () => {
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={loadingForeverEnvironment()}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        if (props === null) {
          console.log(222222222222);
          return (
            <QueryRenderer<CitySummaryStoryQuery>
              query={query}
              environment={returnPayloadEnvironment({
                city: {
                  __typename: "City",
                  id: "1",
                  name: "Madrid",
                  country: "Spain",
                  population: 3600000,
                },
              })}
              variables={{ cityId: "1" }}
              render={({ props }) => {
                //return <div>xxxx</div>;
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

export const citySummarySkeleton3 = () => {
  const env = returnPayloadEnvironment(defaultData);
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, { cityId: "1" });
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
  console.log(env.getStore().getSource()._records);
  let response = env.lookup(operation.fragment);
  console.log(response);
  return (
    <LocalQueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={env}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        return props && props.city && <CitySummary city={props.city} />;
      }}
    />
  );
};

export const citySummarySkeleton4 = () => {
  return (
    <QueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={loadingForeverEnvironment()}
      variables={{ cityId: "1" }}
      render={({ props }) => {
        if (props === null) {
          const env = returnPayloadEnvironment(defaultData);
          const request = getRequest(query);
          const operation = createOperationDescriptor(request, { cityId: "1" });
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
          console.log(env.getStore().getSource()._records);
          let response = env.lookup(operation.fragment);
          console.log(response);
          return (
            <LocalQueryRenderer<CitySummaryStoryQuery>
              query={query}
              environment={env}
              variables={{ cityId: "1" }}
              render={({ props }) => {
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
