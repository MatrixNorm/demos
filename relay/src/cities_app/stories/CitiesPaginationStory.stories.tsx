import * as React from "react";
import { graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import {
  loadingForeverEnvironment,
  returnPayloadEnvironment,
  returnPayloadAsyncEnvironment,
} from "../env";
import CitiesPagination, { defaultData } from "../components/CitiesPagination";
import {
  LoadingPlaceholderQueryRenderer,
  ReloadMessagePanel,
} from "../verysmart/LoadingContext";
import { CitiesPaginationStoryQuery } from "__relay__/CitiesPaginationStoryQuery.graphql";

export default { title: "cities_app-demo1/CitiesPagination" };

const query = graphql`
  query CitiesPaginationStoryQuery {
    citiesPagination {
      ...CitiesPagination_page
    }
  }
`;

type RenderCallback = ({
  props,
}: {
  props: CitiesPaginationStoryQuery["response"];
}) => JSX.Element | undefined;

const based = ({ env, render }: { env: IEnvironment; render?: RenderCallback }) => {
  const renderCallback =
    render ||
    (({ props }) => {
      return (
        props.citiesPagination && (
          <CitiesPagination
            page={props.citiesPagination}
            //@ts-ignore
            refetch={() => {}}
          />
        )
      );
    });
  return (
    <LoadingPlaceholderQueryRenderer<CitiesPaginationStoryQuery>
      query={query}
      environment={env}
      variables={{}}
      placeholderData={{
        citiesPagination: defaultData,
      }}
      render={renderCallback}
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

const demoData = {
  citiesPagination: {
    nodes: demoNodes,
    hasNext: true,
    hasPrev: true,
    pageSize: 3,
  },
};

export const Success = () => {
  const env = returnPayloadEnvironment(demoData);
  return based({ env });
};

export const Loading = () => {
  const env = loadingForeverEnvironment();
  return based({ env });
};

export const Full = () => {
  const env = returnPayloadAsyncEnvironment(function*() {
    yield demoData;
  }, 1000);
  return based({ env });
};

export const ErrorAndReload = () => {
  const env = returnPayloadAsyncEnvironment(function*() {
    yield new Error("shit");
    yield demoData;
  }, 1000);
  return based({ env });
};

export const NullData = () => {
  const env = returnPayloadAsyncEnvironment(function*() {
    yield { citiesPagination: null };
    yield demoData;
  }, 1000);
  return based({
    env,
    render: ({ props }) => {
      return props.citiesPagination ? (
        <CitiesPagination
          page={props.citiesPagination}
          //@ts-ignore
          refetch={() => {}}
        />
      ) : (
        <ReloadMessagePanel message="shit" />
      );
    },
  });
};
