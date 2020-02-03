import * as React from "react";
import { createTestingEnv, loadingForeverEnvironment } from "../env";
import CitiesBrowserPanel from "../components/CitiesBrowserPanel";

export default { title: "cities_app-demo1/CitiesBrowserPanel" };

const makeEnv = () => {
  return createTestingEnv({
    Query: {
      citiesMetadata: () => {
        return {
          populationLowerBound: 100000,
          populationUpperBound: 9999999
        };
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
      __resolveType() {
        return "City";
      }
    }
  });
};

export const ok = () => {
  const environment = makeEnv();
  const searchParams = null;
  return (
    <CitiesBrowserPanel environment={environment} searchParams={searchParams} />
  );
};

export const loading = () => {
  const environment = loadingForeverEnvironment()
  const searchParams =  {
    countryNameContains: null,
    populationGte: null,
    populationLte: null
  };;
  return (
    <CitiesBrowserPanel environment={environment} searchParams={searchParams} />
  );
}