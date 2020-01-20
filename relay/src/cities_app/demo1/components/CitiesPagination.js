import React, { useCallback } from "react";
import { City } from "./City";

function CitiesPage({ cities, pageNo, hasPrev, hasNext, onPrev, onNext }) {
  return (
    <div>
      <ol>
        {cities.map(city => (
          <City city={city} key={city.id} />
        ))}
      </ol>
      <div>
        {hasPrev && <button onClick={onPrev}>PREV</button>}
        <span>{pageNo}</span>
        {hasNext && <button onClick={onNext}>NEXT</button>}
      </div>
    </div>
  );
}

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
