import * as React from "react";
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay";
import { IEnvironment } from "relay-runtime";
import CitiesPagination, {
  defaultData as citiesPaginationDefaultData,
} from "./CitiesPagination";
import {
  LoadingPlaceholderQueryRenderer,
  ReloadMessagePanel,
} from "../verysmart/LoadingContext";
import { SearchParametersNonNullType } from "./SearchParametersPresentational";
import { CitiesPaginationRefetchContainer_root } from "__relay__/CitiesPaginationRefetchContainer_root.graphql";
import { CitiesPaginationRefetchContainerQuery } from "__relay__/CitiesPaginationRefetchContainerQuery.graphql";

const RootQuery = graphql`
  query CitiesPaginationRefetchContainerQuery(
    $pageSize: Int
    $after: String
    $before: String
    $searchParams: CitySearchParamsInput
  ) {
    ...CitiesPaginationRefetchContainer_root
      @arguments(
        pageSize: $pageSize
        after: $after
        before: $before
        searchParams: $searchParams
      )
  }
`;

const CitiesPaginationRefetchContainer = createRefetchContainer(
  ({
    root,
    relay,
  }: {
    root: CitiesPaginationRefetchContainer_root;
    relay: RelayRefetchProp;
  }) => {
    return root.citiesPagination ? (
      <CitiesPagination page={root.citiesPagination} refetch={relay.refetch} />
    ) : (
      <ReloadMessagePanel message="oops..." />
    );
  },
  {
    root: graphql`
      fragment CitiesPaginationRefetchContainer_root on Query
        @argumentDefinitions(
          pageSize: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          searchParams: { type: "CitySearchParamsInput" }
        ) {
        citiesPagination(
          pageSize: $pageSize
          after: $after
          before: $before
          searchParams: $searchParams
        ) {
          ...CitiesPagination_page
        }
      }
    `,
  },
  RootQuery
);

type Props = {
  environment: IEnvironment;
  searchParams: Partial<SearchParametersNonNullType>;
};

export default function({ environment, searchParams }: Props) {
  return (
    <LoadingPlaceholderQueryRenderer<CitiesPaginationRefetchContainerQuery>
      query={RootQuery}
      environment={environment}
      variables={{ searchParams }}
      placeholderData={{
        citiesPagination: citiesPaginationDefaultData,
      }}
      render={({ props }) => {
        return <CitiesPaginationRefetchContainer root={props} />;
      }}
    />
  );
}
