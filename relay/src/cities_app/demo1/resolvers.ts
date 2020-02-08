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
      let { pageNo, searchParams } = args;
      let nodes = cities;
      if (searchParams) {
        let predicates: ((city: t.City) => boolean)[] = [];

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
        nodes = nodes.filter(city => {
          for (let pred of predicates) {
            if (!pred(city)) {
              return false;
            }
          }
          return true;
        });
      }
      return {
        nodes: nodes.slice(pageNo * pageSize, pageNo * pageSize + pageSize),
        pageNo,
        hasNextPage: true,
        hasPrevPage: false
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
        .slice(0, 5);
    }
  },
  Node: {
    __resolveType(node: any) {
      console.log({ node });
      return node;
    }
  }
};
