import React, { useCallback } from "react";
import { CitiesPage } from "./City";

export default function CitiesPagination({ cities, relay }) {
  console.log("CitiesPagination", cities);
  const hasPrev = cities?.hasPrevPage;
  const hasNext = cities?.hasNextPage;
  const pageNo = cities?.pageNo;

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

  if (!cities) {
    return <p>something wrong</p>;
  }

  return (
    <CitiesPage
      cities={cities.nodes}
      pageNo={pageNo}
      hasPrev={hasPrev}
      hasNext={hasNext}
      onPrev={onPrev}
      onNext={onNext}
    />
  );
}
