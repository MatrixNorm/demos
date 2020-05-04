import * as React from "react";
import {
  createRelayEnvironment,
  loadingForeverEnvironment,
  returnPayloadEnvironment,
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
