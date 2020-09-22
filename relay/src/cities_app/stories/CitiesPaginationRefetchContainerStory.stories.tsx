import * as React from "react";
import {
  createTestingEnv,
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnPayloadAsyncEnvironment,
} from "../env";
import CitiesPaginationRefetchContainer from "../components/CitiesPaginationRefetchContainer";

export default { title: "cities_app-demo1/CitiesPaginationRefetchContainer" };

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
  {
    id: "city#4",
    name: "Paris",
    country: "France",
    population: 7000000,
    lat: 0,
    lng: 0,
  },
  {
    id: "city#5",
    name: "London",
    country: "United Kingdom",
    population: 9000000,
    lat: 0,
    lng: 0,
  },
];

export const Aaa = () => {
  const environment = returnPayloadAsyncEnvironment(function*() {
    while (true) {
      yield {
        citiesPagination: {
          nodes: demoNodes,
          hasNext: true,
          hasPrev: true,
          pageSize: demoNodes.length,
        },
      };
    }
  }, 1000);
  return <CitiesPaginationRefetchContainer environment={environment} searchParams={{}} />;
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  return <CitiesPaginationRefetchContainer environment={environment} searchParams={{}} />;
};

export const nullResponse = () => {
  const environment = returnPayloadEnvironment({ citiesPagination: null });
  return <CitiesPaginationRefetchContainer environment={environment} searchParams={{}} />;
};

export const nullResponseThenReload = () => {
  const environment = returnPayloadAsyncEnvironment(function*() {
    yield {
      citiesPagination: null,
    };
    yield {
      citiesPagination: {
        hasNext: false,
        hasPrev: false,
        nodes: [
          { id: "7862", name: "Tokyo", country: "Japan", population: 35676000 },
          {
            id: "9792",
            name: "New York",
            country: "United States",
            population: 19354922,
          },
        ],
      },
    };
  }, 1000);
  return <CitiesPaginationRefetchContainer environment={environment} searchParams={{}} />;
};
