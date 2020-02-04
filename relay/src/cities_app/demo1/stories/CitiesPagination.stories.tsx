import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv, loadingForeverEnvironment } from "../env";
import CitiesPagination, {
  CitiesPaginationSkeleton
} from "../components/CitiesPagination";
import { CitiesPaginationStoryQuery } from "__relay__/CitiesPaginationStoryQuery.graphql";

export default { title: "cities_app-demo1/CityPagination" };

const query = graphql`
  query CitiesPaginationStoryQuery($pageNo: Int!) {
    citiesPagination(pageNo: $pageNo) {
      ...CitiesPagination_page
    }
  }
`;

export const okState = () => {
  const environment = createTestingEnv({
    Query: {
      node() {
        return;
      },
      citiesPagination() {
        return {
          nodes: [
            {
              id: "city#1",
              name: "Madrid",
              country: "Spain",
              population: 3600000
            },
            {
              id: "city#2",
              name: "Rome",
              country: "Italy",
              population: 4600000
            },
            ,
            {
              id: "city#3",
              name: "Turin",
              country: "Italy",
              population: 2300000
            }
          ],
          pageNo: 2,
          hasNextPage: true,
          hasPrevPage: true
        };
      }
    },
    Node: {
      __resolveType() {
        return "City";
      }
    }
  });
  return (
    <QueryRenderer<CitiesPaginationStoryQuery>
      query={query}
      environment={environment}
      variables={{ pageNo: 1 }}
      render={({ error, props }) => {
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
      render={({ error, props }) => {
        if (!props) {
          return <CitiesPaginationSkeleton />;
        }
      }}
    />
  );
};
