import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import CitySummary from "./CitySummary";
import { CitiesPagination_page } from "../__generated__/CitiesPagination_page.graphql";

interface Props {
  page: CitiesPagination_page;
  loadPrevPage: any;
  loadNextPage: any;
}

export function CitiesPagination__({
  page,
  loadPrevPage,
  loadNextPage
}: Props) {
  const onPrev = (currentPage: CitiesPagination_page) => {
    currentPage.hasPrevPage &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: currentPage.pageNo - 1 };
      });
  };
  const onNext = (currentPage: CitiesPagination_page) => {
    currentPage.hasNextPage &&
      relay.refetch(nextVars => {
        return { ...nextVars, pageNo: currentPage.pageNo + 1 };
      });
  };
  const { nodes, hasPrevPage, hasNextPage, pageNo } = page;
  return (
    <div>
      <ol>
        {nodes && nodes.map(city => <CitySummary city={city} key={city.id} />)}
      </ol>
      <div>
        {hasPrevPage && (
          <button onClick={() => loadPrevPage(page)}>
            PREV
          </button>
        )}
        <span>{pageNo}</span>
        {hasNextPage && (
          <button onClick={() => loadNextPage(page)}>
            NEXT
          </button>
        )}
      </div>
    </div>
  );
}

export default createFragmentContainer(CitiesPagination__, {
  page: graphql`
    fragment CitiesPagination_page on CitiesPagination {
      pageNo
      hasNextPage
      hasPrevPage
      nodes {
        id
        ...CitySummary_city
      }
    }
  `
});
