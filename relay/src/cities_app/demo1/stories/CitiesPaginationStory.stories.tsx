import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv, loadingForeverEnvironment } from "../env";

import CitiesPagination, {
  CitiesPaginationSkeleton
} from "../components/CitiesPagination";

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
            lng: 0
          },
          {
            id: "city#2",
            name: "Rome",
            country: "Italy",
            population: 4600000,
            lat: 0,
            lng: 0
          },
          {
            id: "city#3",
            name: "Turin",
            country: "Italy",
            population: 2300000,
            lat: 0,
            lng: 0
          }
        ];
        return {
          nodes,
          hasNext: true,
          hasPrev: true
        };
      }
    },
    Node: {
      __resolveType() {}
    }
  });
  return (
    <QueryRenderer<CitiesPaginationStoryQuery>
      query={query}
      environment={environment}
      variables={{}}
      render={({ props }) => {
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
      variables={{ pageNo: 1 }}
      render={({ props }) => {
        if (!props) {
          return <CitiesPaginationSkeleton />;
        }
      }}
    />
  );
};
