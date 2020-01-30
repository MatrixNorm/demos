import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import CitiesPagination from "../components/CitiesPagination";

export default { title: "cities_app-demo1/CityPagination" };

export const aaa = () => {
  const environment = createTestingEnv({
    Query: {
      node(_, { id }) {
        return { id };
      },
      citiesPagination(_, args) {
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
      __resolveType(node) {
        return "City";
      }
    }
  });
  return (
    <QueryRenderer
      query={graphql`
        query CitiesPaginationQuery($pageNo: Int!) {
          citiesPagination(pageNo: $pageNo) {
            ...CitiesPagination_page
          }
        }
      `}
      environment={environment}
      variables={{ pageNo: 1 }}
      render={({ error, props }) => {
        return (
          <CitiesPagination
            page={props.citiesPagination}
            loadPrevPage={() => console.log('prev')}
            loadNextPage={() => console.log('next')}
          />
        );
      }}
    />
  );
};
