import * as React from "react";
// @ts-ignore
import StoryRouter from "storybook-react-router";
import {
  createTestingEnv,
  loadingForeverEnvironment,
  createRelayEnvironment,
  returnAsyncPayloadEnvironment,
} from "../env";
import SearchParameters from "../components/SearchParameters";

export default {
  title: "cities_app-demo1/SearchParameters",
  decorators: [
    (storyFn: unknown) => {
      let router = StoryRouter();
      return router(storyFn);
    },
  ],
};

export const loaded = () => {
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => {
        return {
          populationLowerBound: 100000,
          populationUpperBound: 1000000,
        };
      },
    },
    Node: {
      __resolveType() {},
    },
  });
  return <SearchParameters environment={environment} />;
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  return <SearchParameters environment={environment} />;
};

export const noServerData = () => {
  const environment = returnAsyncPayloadEnvironment(function*() {
    yield {
      citiesMetadata: null,
    };
    yield {
      citiesMetadata: {
        populationLowerBound: 100000,
        populationUpperBound: 1000000,
      },
    };
  }, 1000);
  return <SearchParameters environment={environment} />;
};

export const serverError = () => {
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => {
        throw new Error("sheisse");
      },
    },
    Node: {
      __resolveType() {},
    },
  });
  return <SearchParameters environment={environment} />;
};

export const full = () => {
  const environment = createRelayEnvironment({ timeout: 1000 });
  return <SearchParameters environment={environment} />;
};
