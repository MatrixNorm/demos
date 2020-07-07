import * as React from "react";
import { useState } from "react";
import {
  QueryRenderer,
  graphql,
  createRefetchContainer,
  RelayRefetchProp,
} from "react-relay";
import { IEnvironment } from "relay-runtime";
import CitiesPagination, {
  defaultData as citiesPaginationDefaultData,
} from "./CitiesPagination";
import { SearchParametersNullableType } from "./SearchParameters";
import { LoadingPlaceholderQueryRenderer } from "../LoadingContext";
import { LoadingPlaceholder } from "../LoadingContext";
import { LoadingErrorBoundary } from "../elements/LoadingErrorBoundary";

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

const CitiesPaginationRefetchContainer = createRefetchContainer(
  ({
    root,
    relay,
  }: //reload,
  {
    root: CitiesPaginationRefetchContainer_root;
    relay: RelayRefetchProp;
    //reload?: () => void;
  }) => {
    /**
     * Have to handle case of citiesPagination being null here
     * instead of parent component that is more natural.
     * See this issue https://github.com/facebook/relay/issues/2118
     */
    // if (!root.citiesPagination) {
    //   reload && reload();
    // }
    return (
      root.citiesPagination && (
        <CitiesPagination
          page={root.citiesPagination}
          loadNextPage={loadNextPage(relay)}
          loadPrevPage={loadPrevPage(relay)}
        />
      )
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

type Props = {
  environment: IEnvironment;
  searchParams: SearchParametersNullableType;
};

export default function XYZ({ environment, searchParams }: Props) {
  return (
    <LoadingErrorBoundary>
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
    </LoadingErrorBoundary>
  );
}

// export default ({ environment, searchParams }: Props) => {
//   const query = graphql`
//     query CitiesPaginationRefetchContainerQuery(
//       $pageSize: Int
//       $after: String
//       $before: String
//       $searchParams: CitySearchParamsInput
//     ) {
//       ...CitiesPaginationRefetchContainer_root
//         @arguments(
//           pageSize: $pageSize
//           after: $after
//           before: $before
//           searchParams: $searchParams
//         )
//     }
//   `;
//   const [reload, setReload] = useState(false);
//   if (reload) {
//     return <Reload message="something went wrong" onClick={() => setReload(false)} />;
//   }
//   return (
//     <QueryRenderer<CitiesPaginationRefetchContainerQuery>
//       query={query}
//       environment={environment}
//       variables={{ searchParams }}
//       render={({ props, error }) => {
//         if (error) {
//           setReload(true);
//           return;
//         }
//         if (props === null) {
//           return (
//             <LoadingPlaceholder
//               query={query}
//               variables={{ searchParams }}
//               data={{
//                 citiesPagination: { ...citiesPaginationDefaultData },
//               }}
//               render={({ props }: any) => {
//                 return props && <CitiesPaginationRefetchContainer root={props} />;
//               }}
//             />
//           );
//         }
//         return (
//           <CitiesPaginationRefetchContainer root={props} reload={() => setReload(true)} />
//         );
//       }}
//     />
//   );
// };
