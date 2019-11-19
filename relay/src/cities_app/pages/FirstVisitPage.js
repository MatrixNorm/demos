import React, { useRef } from "react";
import ImportData from "../components/ImportData";

export default function FirstVisitPage({ setDataLoaded }) {
  console.log('FirstVisitPage')
  function onImportDone() {
    setDataLoaded(true);
  }

  return (
    <div>
      <ImportData onImportDone={onImportDone} />
      <div>
        No data at the moment. Import cities.json file.
      </div>
    </div>
  );
}
