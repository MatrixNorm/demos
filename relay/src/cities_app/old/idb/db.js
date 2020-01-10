import Dexie from "dexie";
import config from './config'

const db = new Dexie(config.dbName);

db.version(1).stores({
  cities: "id, name, lat, lng, country, population"
});

window.Dexie = Dexie

export default db