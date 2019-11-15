import React, { useRef } from "react";
import db from "./db";

export default function ImportData() {
  const inputEl = useRef(null);

  function onInputFileChange() {
    const file = inputEl.current.files[0];
    console.log(file.size);
  }

  function onImportButtonSubmit() {
    const file = inputEl.current.files[0];
    const reader = new FileReader();
    reader.onload = evt => {
      const data = JSON.parse(evt.target.result);
      console.log("Start data import");
      db.table("cities")
        .bulkPut(data)
        .then(() => {
          console.log("Data import complete");
        });
    };
    reader.readAsBinaryString(file);
  }

  return (
    <>
      <input
        ref={inputEl}
        onChange={onInputFileChange}
        type="file"
        id="selectFiles"
      />
      <button id="import" onClick={onImportButtonSubmit}>
        Import
      </button>
    </>
  );
}
