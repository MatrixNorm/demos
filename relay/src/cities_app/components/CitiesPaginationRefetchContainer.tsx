import * as React from "react";
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay";
import { IEnvironment } from "relay-runtime";
import CitiesPagination, {
  defaultData as citiesPaginationDefaultData,
} from "./CitiesPagination";
import { SearchParametersNullableType } from "./SearchParameters";
import { LoadingPlaceholderQueryRenderer } from "../LoadingContext";
import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";
import { CitiesPaginationRefetchContainer_root } from "__relay__/CitiesPaginationRefetchContainer_root.graphql";
import { CitiesPaginationRefetchContainerQuery } from "__relay__/CitiesPaginationRefetchContainerQuery.graphql";

type Frags = {
  root: CitiesPaginationRefetchContainer_root;
  relay: RelayRefetchProp;
};

type Props = Frags & {
  render?: RenderCallbackType;
};

type RenderCallbackType = (
  frags: Frags,
  {
    next,
    prev,
  }: {
    next: (currentPage: CitiesPagination_page) => void;
    prev: (currentPage: CitiesPagination_page) => void;
  }
) => JSX.Element;

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

const CitiesPaginationRefetchContainer = createRefetchContainer(
  ({ root, relay, render }: Props) => {
    return render
      ? render({ root, relay }, { next: loadNextPage(relay), prev: loadPrevPage(relay) })
      : root.citiesPagination && (
          <CitiesPagination
            page={root.citiesPagination}
            loadNextPage={loadNextPage(relay)}
            loadPrevPage={loadPrevPage(relay)}
          />
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
  graphql`
    query CitiesPaginationRefetchContainerRefetchQuery(
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
  `
);

export default function({
  environment,
  searchParams,
}: {
  environment: IEnvironment;
  searchParams: SearchParametersNullableType;
}) {
  return (
    <LoadingPlaceholderQueryRenderer<CitiesPaginationRefetchContainerQuery>
      query={graphql`
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
      `}
      environment={environment}
      variables={{ searchParams }}
      placeholderData={{
        citiesPagination: { ...citiesPaginationDefaultData },
      }}
      render={({ props }) => {
        return <CitiesPaginationRefetchContainer root={props} />;
      }}
    />
  );
}
