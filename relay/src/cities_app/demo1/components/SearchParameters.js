import React, { useState } from "react";
import { commitLocalUpdate } from "relay-runtime";

export default function SearchParameters({
  metadata,
  initialSearchParams,
  relay
}) {
  console.log("SearchParameters");
  const [searchParams, setSearchParams] = useState({
    ...{ countryNameContains: "" },
    ...(initialSearchParams || {})
  });

  function onButtonClick() {
    commitLocalUpdate(relay.environment, store => {
      console.log(store);
      // const uiStateId = "client:UIState";
      // const uiState = store.create(uiStateId, "UIState");

      // const citySearchParams = store.create(
      //   "client:UICitySearchParams",
      //   "UICitySearchParams"
      // );
      // citySearchParams.setValue("France", "country");
      // uiState.setLinkedRecord(citySearchParams, "citySearchParams");
    });
  }

  return (
    <div>
      <div>Country: </div>
      <input
        type="text"
        value={searchParams.countryNameContains}
        onChange={e =>
          setSearchParams({
            ...setSearchParams,
            countryNameContains: e.target.value
          })
        }
      />
      <div>
        <button onClick={onButtonClick}>Apply</button>
      </div>
    </div>
  );
}
