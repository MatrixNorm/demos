import React from "react";

function City({ city }) {
  return (
    <div>
      <div>{city.name}<i>({city.country})</i></div>
      <div>{city.population}</div>
    </div>
  );
}

export default function CitiesPagination({ cities, refetch }) {
  console.log("CitiesPagination", cities);
  const hasPrev = cities?.hasPrevPage;
  const hasNext = cities?.hasNextPage;
  const pageNo = cities?.pageNo;

  function prevPage() {
    hasPrev &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: pageNo - 1 };
      });
  }

  function nextPage() {
    hasNext && loadNextPage();
  }

  return (
    <div>
      <ol>
        {cities.nodes.map(city => (
          <City city={city} key={city.id} />
        ))}
      </ol>
      <div>
        <button onClick={prevPage}>PREV</button>
        <span>{pageNo}</span>
        <button onClick={nextPage}>NEXT</button>
      </div>
    </div>
  );
}
