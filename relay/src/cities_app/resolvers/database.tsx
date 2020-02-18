import * as _ from "lodash";
import * as t from "../types.codegen";
// @ts-ignore
import citiesTxt from "raw-loader!../resources/cities.json.txt";

export const cities: t.City[] = _.orderBy(
  JSON.parse(citiesTxt).map((city: t.City) => ({
    ...city,
    id: city.id.toString()
  })),
  ["population"],
  ["desc"]
);

export const countries = [...new Set(cities.map(i => i.country))];

export const citiesMetadata = {
  populationLowerBound: cities
    .map(c => c.population)
    .reduce((a, b) => Math.min(a, b)),
  populationUpperBound: cities
    .map(c => c.population)
    .reduce((a, b) => Math.max(a, b))
};

export const users: { [key: string]: t.User } = {
  "user#anon": {
    id: "user#anon",
    name: "anon",
    settings: { citiesPaginationPageSize: 4, foo: "boomer", bar: 11 }
  },
  "user#1": {
    id: "user#1",
    name: "Bob",
    settings: { citiesPaginationPageSize: 5, foo: "zoomer", bar: 9 }
  }
};
