import d from "datascript";
import citiesTxt from "raw-loader!theapp/cities.json.txt";

const cities = JSON.parse(citiesTxt);

let db = d.init_db(
  cities.flatMap(c => {
    let { id, ...rest } = c;
    return Object.entries(rest).map(p => [id, p[0], p[1]]);
  })
);

console.log(
  d.q(
    `
[:find ?name ?population :where 
  [?e "country" "China"]
  [?e "name" ?name]
  [?e "population" ?population]]`,
    db
  )
);

window.d = d;
window.db = db;
