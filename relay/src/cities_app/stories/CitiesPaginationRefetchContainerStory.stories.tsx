import * as React from "react";
import {
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnPayloadAsyncEnvironment,
} from "../env";
import CitiesPaginationRefetchContainer from "../components/CitiesPaginationRefetchContainer";
import { demoNodes } from "./CitiesPaginationStory.stories";

export default { title: "cities_app-demo1/CitiesPaginationRefetchContainer" };

export const Aaa = () => {
  const environment = returnPayloadAsyncEnvironment(function*() {
    while (true) {
      yield {
        root: {
          citiesPagination: {
            nodes: demoNodes,
            hasNext: true,
            hasPrev: false,
            pageSize: demoNodes.length,
          },
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
