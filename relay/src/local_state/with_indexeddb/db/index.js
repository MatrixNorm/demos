import Dexie from "dexie";

window.Dexie = Dexie;

export const config = {
  dbName: "local_state/with_indexeddb"
};

export const db = new Dexie(config.dbName);

db.version(1).stores({
  cities: "id, name, country, population, lat, lng"
});

export async function isDataImported() {
  const isDbExists = await Dexie.exists(config.dbName);
  if (isDbExists) {
    const db = await new Dexie(config.dbName).open();
    const tableNames = db.tables.map(t => t.name);
    return tableNames.includes("cities");
  } else {
    return false;
  }
}
