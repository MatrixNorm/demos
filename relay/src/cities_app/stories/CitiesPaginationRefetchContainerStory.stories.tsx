import * as React from "react";
import {
  createRelayEnvironment,
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnPayloadAsyncEnvironment,
} from "../env";
import CitiesPagination from "../components/CitiesPaginationRefetchContainer";

export default { title: "cities_app-demo1/CitiesPaginationRefetchContainer" };

export const Aaa = () => {
  const environment = createRelayEnvironment();
  return (
    <CitiesPagination
      environment={environment}
      searchParams={{
        countryNameContains: null,
        populationGte: null,
        populationLte: null,
      }}
    />
  );
};

export const Bbb = () => {
  const environment = createRelayEnvironment();
  return (
    <CitiesPagination
      environment={environment}
      searchParams={{
        countryNameContains: "united",
        populationGte: null,
        populationLte: null,
      }}
    />
  );
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  return (
    <CitiesPagination
      environment={environment}
      searchParams={{
        countryNameContains: null,
        populationGte: null,
        populationLte: null,
      }}
    />
  );
};

export const nullResponse = () => {
  const environment = returnPayloadEnvironment({ citiesPagination: null });
  return (
    <CitiesPagination
      environment={environment}
      searchParams={{
        countryNameContains: null,
        populationGte: null,
        populationLte: null,
      }}
    />
  );
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
  return (
    <CitiesPagination
      environment={environment}
      searchParams={{
        countryNameContains: null,
        populationGte: null,
        populationLte: null,
      }}
    />
  );
};
