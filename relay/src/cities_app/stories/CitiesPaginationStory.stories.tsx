import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnAsyncPayloadEnvironment,
} from "../env";
import CitiesPagination, { defaultData } from "../components/CitiesPagination";
import { LoadingPlaceholder } from "../verysmart/LoadingContext";
import { CitiesPaginationStoryQuery } from "__relay__/CitiesPaginationStoryQuery.graphql";

export default { title: "cities_app-demo1/CitiesPagination" };

const query = graphql`
  query CitiesPaginationStoryQuery {
    citiesPagination {
      ...CitiesPagination_page
    }
  }
`;

const based = (env: IEnvironment) => {
  return (
    <QueryRenderer<CitiesPaginationStoryQuery>
      query={query}
      environment={env}
      variables={{}}
      render={({ props }) => {
        if (props === null) {
          return (
            <LoadingPlaceholder
              query={query}
              variables={{}}
              data={{
                citiesPagination: defaultData,
              }}
              render={({ props }: any) => {
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
              }}
            />
          );
        }
        return (
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

const demoNodes = [
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

export const success = () => {
  const environment = returnPayloadEnvironment({
    citiesPagination: {
      nodes: demoNodes,
      hasNext: true,
      hasPrev: true,
    },
  });
  return based(environment);
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  return based(environment);
};

export const full = () => {
  const environment = returnAsyncPayloadEnvironment(function*() {
    yield {
      citiesPagination: {
        nodes: demoNodes,
        hasNext: true,
        hasPrev: true,
      },
    };
  }, 1000);
  return based(environment);
};
