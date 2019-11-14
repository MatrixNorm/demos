import React, { useRef } from "react";
import Dexie from "dexie";

function App() {
  const inputEl = useRef(null);

  function onInputFileChange() {
    const file = inputEl.current.files[0];
    console.log(file.size);
  }

  function onImportButtonSubmit() {
    const file = inputEl.current.files[0];
    const reader = new FileReader();
    reader.onload = evt => {
      console.log(111111);
      const data = JSON.parse(evt.target.result);

      const db = new Dexie("indexeddb/demo1-v1");

      db.version(1).stores({
        cities: "id"
      });

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

export default App;
