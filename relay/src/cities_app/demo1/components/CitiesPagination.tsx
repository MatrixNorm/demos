import React, { useCallback } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { CitySummary } from "./CitySummary";

export function CitiesPagination__({ page, relay }) {
  console.log("CitiesPagination", page);
  const hasPrev = page?.hasPrevPage;
  const hasNext = page?.hasNextPage;
  const pageNo = page?.pageNo;

  const onPrev = useCallback(() => {
    hasPrev &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo - 1 };
      });
  });
  const onNext = useCallback(() => {
    hasNext &&
      relay.refetch(nextVars => {
        return { ...nextVars, pageNo: pageNo + 1 };
      });
  });

  if (!page) {
    return <p>something wrong</p>;
  }

  return (
    <div>
      <ol>
        {page.nodes.map(city => (
          <CitySummary city={city} key={city.id} />
        ))}
      </ol>
      <div>
        {page.hasPrev && <button onClick={onPrev}>PREV</button>}
        <span>{page.pageNo}</span>
        {page.hasNext && <button onClick={onNext}>NEXT</button>}
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
        ...CitySummary_city
      }
    }
  `
});
