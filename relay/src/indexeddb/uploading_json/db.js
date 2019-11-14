import Dexie from "dexie";

const db = new Dexie("indexeddb/uploading_json");

db.version(1).stores({
  cities: "id, city, lat, lng, country"
});

window.Dexie = Dexie

export default db