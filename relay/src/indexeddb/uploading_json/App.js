import React, { useEffect, useState } from "react";
import Dexie from "dexie";
import config from "./config";
import ImportData from "./ImportData";
import ViewData from "./ViewData";

export default function App() {
  const [citiesIdbStoreExists, setcitiesIdbStoreExists] = useState(null);

  useEffect(function() {
    async function inner() {
      const isDbExists = await Dexie.exists(config.dbName);
      if (isDbExists) {
        const db = await new Dexie(config.dbName).open();
        const tableNames = db.tables.map(t => t.name);
        setcitiesIdbStoreExists(tableNames.includes("cities"));
      } else {
        setcitiesIdbStoreExists(false);
      }
    }
    inner();
  }, []);

  if (citiesIdbStoreExists === null) {
    return null;
  }
  if (citiesIdbStoreExists) {
    return <ViewData />;
  }
  return <ImportData />;
}
