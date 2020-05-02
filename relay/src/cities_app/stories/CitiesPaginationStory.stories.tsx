import * as React from "react";
import { graphql, QueryRenderer, LocalQueryRenderer } from "react-relay";
import { createOperationDescriptor, getRequest } from "relay-runtime";
import {
  createTestingEnv,
  loadingForeverEnvironment,
  noNetworkEnvironment,
} from "../env";
import CitiesPagination, { defaultData } from "../components/CitiesPagination";
import { renderLoadingPlaceholder } from "../LoadingContext";

import { CitiesPaginationStoryQuery } from "__relay__/CitiesPaginationStoryQuery.graphql";
import * as t from "../types.codegen";

export default { title: "cities_app-demo1/CitiesPagination" };

const query = graphql`
  query CitiesPaginationStoryQuery {
    citiesPagination {
      ...CitiesPagination_page
    }
  }
`;

export const okState = () => {
  const environment = createTestingEnv({
    Query: {
      node() {},
      citiesPagination(): t.CitiesPagination {
        let nodes: t.City[] = [
          {
            id: "city#1",
            name: "Madrid",
            country: "Spain",
            population: 3600000,
            lat: 0,
            lng: 0,
          },
          {
            id: "city#2",
            name: "Rome",
            country: "Italy",
            population: 4600000,
            lat: 0,
            lng: 0,
          },
          {
            id: "city#3",
            name: "Turin",
            country: "Italy",
            population: 2300000,
            lat: 0,
            lng: 0,
          },
        ];
        return {
          nodes,
          hasNext: true,
          hasPrev: true,
        };
      },
    },
    Node: {
      __resolveType() {},
    },
  });
  return (
    <QueryRenderer<CitiesPaginationStoryQuery>
      query={query}
      environment={environment}
      variables={{}}
      render={({ props }) => {
        console.log(props);
        return (
          props &&
          props.citiesPagination && (
            <CitiesPagination
              page={props.citiesPagination}
              loadPrevPage={() => console.log("prev")}
              loadNextPage={() => console.log("next")}
            />
          )
        );
      }}
    />
  );
};

export const loadingState = () => {
  return (
    <QueryRenderer<CitiesPaginationStoryQuery>
      query={query}
      environment={loadingForeverEnvironment()}
      variables={{}}
      render={({ props }) => {
        if (props === null) {
          return renderLoadingPlaceholder({
            query,
            variables: {},
            data: {
              citiesPagination: defaultData,
            },
            render: ({ props }: any) => {
              return (
                props &&
                props.citiesPagination && (
                  <CitiesPagination
                    page={props.citiesPagination}
                    loadPrevPage={() => {}}
                    loadNextPage={() => {}}
                  />
                )
              );
            },
          });
        }
        return null;
      }}
    />
  );
};
