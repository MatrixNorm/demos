// @flow

import React, { useEffect, useState } from "react";
import Dexie from "dexie";
import config from "./config";
import App from "./App";
import FirstVisitPage from "./pages/FirstVisitPage";

export default function Root() {
  const [dataLoaded, setDataLoaded] = useState(null);

  useEffect(function() {
    async function inner() {
      const isDbExists = await Dexie.exists(config.dbName);
      if (isDbExists) {
        const db = await new Dexie(config.dbName).open();
        const tableNames = db.tables.map(t => t.name);
        setDataLoaded(tableNames.includes("cities"));
      } else {
        setDataLoaded(false);
      }
    }
    inner();
  }, []);
  console.log("dataLoaded: ", dataLoaded);
  if (dataLoaded === null) {
    return null;
  }
  if (dataLoaded) {
    return <App />;
  }
  return <FirstVisitPage setDataLoaded={setDataLoaded} />;
}
