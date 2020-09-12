import * as React from "react";
import { graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnPayloadAsyncEnvironment,
} from "../env";
import CitySummary, { defaultData } from "../components/CitySummary";
import {
  LoadingPlaceholderQueryRenderer,
  ReloadMessagePanel,
} from "../verysmart/LoadingContext";
import { CitySummaryStoryQuery } from "__relay__/CitySummaryStoryQuery.graphql";

export default { title: "cities_app-demo1/CitySummary" };

const query = graphql`
  query CitySummaryStoryQuery($cityId: ID!) {
    city: node(id: $cityId) {
      ...CitySummary_city
    }
  }
`;

function base({ env }: { env: IEnvironment }) {
  return (
    <LoadingPlaceholderQueryRenderer<CitySummaryStoryQuery>
      query={query}
      environment={env}
      variables={{ cityId: "1" }}
      placeholderData={{
        city: defaultData,
      }}
      render={({ props }) => {
        return props.city ? (
          <CitySummary city={props.city} />
        ) : (
          <ReloadMessagePanel message="shit" />
        );
      }}
    />
  );
}

export const Ok = () => {
  const env = returnPayloadEnvironment({
    city: {
      __typename: "City",
      id: "1",
      name: "Madrid",
      country: "Spain",
      population: 3600000,
    },
  });
  return base({ env });
};

export const Loading = () => {
  return base({ env: loadingForeverEnvironment() });
};

export const Full = () => {
  const env = returnPayloadAsyncEnvironment(function*() {
    yield {
      city: {
        __typename: "City",
        id: "1",
        name: "Madrid",
        country: "Spain",
        population: 3600000,
      },
    };
  }, 1000);
  return base({ env });
};

export const FetchErrorThenLoad = () => {
  const env = returnPayloadAsyncEnvironment(function*() {
    yield new Error("shit");
    yield {
      city: {
        __typename: "City",
        id: "1",
        name: "Madrid",
        country: "Spain",
        population: 3600000,
      },
    };
  }, 1000);
  return base({ env });
};

export const NullData = () => {
  const env = returnPayloadAsyncEnvironment(function*() {
    yield null;
    yield {
      city: {
        __typename: "City",
        id: "1",
        name: "Madrid",
        country: "Spain",
        population: 3600000,
      },
    };
  }, 1000);
  return base({ env });
};

export const NullFragmentData = () => {
  const env = returnPayloadAsyncEnvironment(function*() {
    yield { city: null };
    yield { city: null };
    yield {
      city: {
        __typename: "City",
        id: "1",
        name: "Madrid",
        country: "Spain",
        population: 3600000,
      },
    };
  }, 1000);
  return base({ env });
};
