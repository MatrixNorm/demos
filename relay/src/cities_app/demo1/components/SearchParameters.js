import React from "react";

export default function SearchParameters({
  metadata,
  initialSearchParams,
  refetch
}) {
  console.log("SearchParameters");

  function onButtonClick() {
    refetch();
  }

  return (
    <div>
      <input type="text" value={initialSearchParams?.countryNameContains} />
      <button onClick={onButtonClick}>Apply</button>
    </div>
  );
}
