import * as idb from "idb";
import citiesJson from "raw-loader!./data/cities.data";

idb
  .openDB("relay-sandbox/indexeddb-1", 1, {
    upgrade(db) {
      // Called if this version of the database has never been opened before.
      if (!db.objectStoreNames.contains('cities')) {
        db.createObjectStore('cities', {keyPath: 'id'});
      }
    }
  })
  .then(x => console.log(x));


console.log(JSON.parse(citiesJson))