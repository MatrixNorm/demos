import * as _ from "lodash";
// @ts-ignore
import citiesTxt from "raw-loader!./resources/cities.json.txt";
import * as t from "./types.codegen";

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
      let pageSize =
        args.pageSize || context.user.settings?.citiesPaginationPageSize || 3;
      let { after, before, searchParams } = args;
      let predicates: ((city: t.City) => boolean)[] = [];
      if (searchParams) {
        if (searchParams.countryNameContains) {
          let { countryNameContains } = searchParams;
          predicates.push((city: t.City) =>
            city.country
              .toLowerCase()
              .includes(countryNameContains.toLowerCase())
          );
        }
        if (searchParams.populationGte) {
          let { populationGte } = searchParams;
          predicates.push((city: t.City) => city.population >= populationGte);
        }
        if (searchParams.populationLte) {
          let { populationLte } = searchParams;
          predicates.push((city: t.City) => city.population <= populationLte);
        }
      }
      let result = [];
      let hasNext = null;
      let hasPrev = null;
      if (before) {
        // getting prev page
        let endIndex = cities.findIndex(city => city.id === before);
        if (endIndex < 0) {
          throw new Error("Bad cursor");
        }
        for (let i = endIndex - 1; i >= 0; i--) {
          let city = cities[i];
          if (predicates.map(p => p(city)).every(Boolean)) {
            result.push(city);
          }
          // adding extra one node to calculate hasPrev
          if (result.length > pageSize) {
            break;
          }
        }
        hasNext = true;
        hasPrev = result.length > pageSize;
        // remove extra node frmo the front
        result = result.slice(-pageSize);
      } else {
        // getting next page
        let startIndex = after
          ? cities.findIndex(city => city.id === after)
          : 0;
        if (startIndex < 0) {
          throw new Error("Bad cursor");
        }
        for (let i = startIndex + 1; i < cities.length; i++) {
          let city = cities[i];
          if (predicates.map(p => p(city)).every(Boolean)) {
            result.push(city);
          }
          // adding extra one node to calculate hasNext
          if (result.length > pageSize) {
            break;
          }
        }
        hasNext = result.length > pageSize;
        hasPrev = after !== null;
        // remove extra node frmo the end
        result = result.slice(pageSize);
      }
      return {
        nodes: result,
        hasNext,
        hasPrev
      };
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
