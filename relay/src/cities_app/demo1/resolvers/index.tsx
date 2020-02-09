import * as _ from "lodash";
import citiesPagination from "./citiesPagination";
// @ts-ignore
import citiesTxt from "raw-loader!./resources/cities.json.txt";
import * as t from "../types.codegen";

const cities: t.City[] = _.orderBy(
  JSON.parse(citiesTxt),
  ["population"],
  ["desc"]
);
const countries = [...new Set(cities.map(i => i.country))];
const citiesMetadata = {
  populationLowerBound: cities
    .map(c => c.population)
    .reduce((a, b) => Math.min(a, b)),
  populationUpperBound: cities
    .map(c => c.population)
    .reduce((a, b) => Math.max(a, b))
};

export const dbUsers: { [key: string]: t.User } = {
  "user#anon": {
    id: "user#anon",
    name: "anon",
    settings: { citiesPaginationPageSize: 5 }
  },
  "user#1": {
    id: "user#1",
    name: "Bob",
    settings: { citiesPaginationPageSize: 7 }
  }
};

export const serverResolvers = {
  Query: {
    viewer: () => {
      // logged-in user
      return dbUsers["user#1"];
    },
    node: (_: any, { id }: t.Node) => {
      return { id };
    },
    citiesPagination: (
      _: any,
      args: t.QueryCitiesPaginationArgs,
      context: { user: t.User }
    ): t.CitiesPagination => {
      return citiesPagination(
        cities,
        args,
        context.user.settings?.citiesPaginationPageSize || 3
      );
    },
    citiesMetadata: () => {
      return {
        ...citiesMetadata,
        latLowerBound: 11.97,
        latUpperBound: 67.53,
        lngLowerBound: 9.47,
        lngUpperBound: 78.25
      };
    },
    countries: (_: any, { searchString }: t.QueryCountriesArgs) => {
      return countries
        .filter(c => c.toLowerCase().includes(searchString))
        .slice(0, 8);
    }
  },
  Node: {
    __resolveType(node: any) {
      console.log({ node });
      return node;
    }
  }
};
