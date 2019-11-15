import React, { useEffect, useState } from "react";
import Dexie from "dexie";
import ImportData from "./ImportData";
import ViewData from "./ViewData";

export default function App() {
  const [isCitiesIdbStoreExists, setIsCitiesIdbStoreExists] = useState(null);

  useEffect(function() {
    new Dexie("indexeddb/uploading_json").open().then(db => {
      const tableNames = db.tables.map(t => t.name);
      setIsCitiesIdbStoreExists(tableNames.includes("cities"));
    });
  }, []);

  if (isCitiesIdbStoreExists === null) {
    return null;
  }
  if (isCitiesIdbStoreExists) {
    return <ViewData />;
  }
  return <ImportData />;
}
