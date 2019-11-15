import Dexie from "dexie";
import config from './config'

const db = new Dexie(config.dbName);

db.version(1).stores({
  cities: "id, city, lat, lng, country"
});

window.Dexie = Dexie

export default db