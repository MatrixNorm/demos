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
import { NukeFragRef } from "../helpers/typeUtils";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";
import { CitiesPaginationRefetchContainer_root } from "__relay__/CitiesPaginationRefetchContainer_root.graphql";
import { CitiesPaginationRefetchContainerQuery } from "__relay__/CitiesPaginationRefetchContainerQuery.graphql";

const loadNextPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let after = nodes[nodes.length - 1].id;
    currentPage.hasNext &&
      relay.refetch((nextVars) => {
        return { ...nextVars, after };
      });
  }
};

const loadPrevPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let before = nodes[0].id;
    currentPage.hasPrev &&
      relay.refetch((prevVars) => {
        return { ...prevVars, before };
      });
  }
};

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
      <CitiesPagination
        page={root.citiesPagination}
        loadNextPage={loadNextPage(relay)}
        loadPrevPage={loadPrevPage(relay)}
      />
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
  searchParams: NukeFragRef<SearchParameters_searchParams>;
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
