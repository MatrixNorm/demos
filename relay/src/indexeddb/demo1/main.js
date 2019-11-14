import Dexie from "dexie";
import citiesJson from "raw-loader!./data/cities.data";

const db = new Dexie("indexeddb/demo1-v1");

db.version(1).stores({
  cities: "id"
});

db.on("populate", function(tx) {
  const citiesData = JSON.parse(citiesJson);
  console.log("Start data import...");
  tx.table("cities")
    .bulkAdd(citiesData)
    .then(() => {
      console.log("Data import complete");
    });
});

// actually hits indexeddb
db.open()
  .then(db => {
    console.log(db);
  })
  .catch(e => {
    console.error("Open failed: " + e);
  });
