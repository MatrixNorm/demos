import Dexie from "dexie";

export const config = {
  dbName: "local_state/with_indexeddb"
};

const db = new Dexie(config.dbName);

db.version(1).stores({
  cities: "id, name, country, population, lat, lng"
});

window.Dexie = Dexie;
export default db;
