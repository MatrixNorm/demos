import _ from "lodash";
import citiesTxt from "raw-loader!theapp/resources/cities.json.txt";
// import { a2 } from "shadow-cljs/theapp.foo";
// window.a2 = a2

const cities = _.orderBy(JSON.parse(citiesTxt), ["population"], ["desc"]);
const countries = [...new Set(cities.map(i => i.country))];

export const serverResolvers = {
  Query: {
    viewer: () => {
      return { id: 1 };
    },
    node: (_, { id }) => {
      console.log({ id });
      return { id };
    },
    citiesPagination: (_, args) => {
      console.log("citiesPagination: ", args);
      let nodes;
      let pageSize = 5;
      let { country } = args.searchParams;
      if (country) {
        nodes = cities
          .filter(city => city.country === country)
          .slice(0, pageSize);
      } else {
        nodes = cities.slice(0, pageSize);
      }
      return {
        nodes,
        pageNo: 0,
        hasNextPage: true,
        hasPrevPage: false
      };
    },
    citiesMetadata: () => {
      return {
        populationLowerBound: 400000,
        populationUpperBound: 9000000,
        latLowerBound: 11.97,
        latUpperBound: 67.53,
        lngLowerBound: 9.47,
        lngUpperBound: 78.25
      };
    },
    countries: (_, { searchString }) => {
      return countries
        .filter(c => c.toLowerCase().includes(searchString))
        .slice(0, 5);
    }
  },
  Node: {
    __resolveType(node) {
      console.log({ node });
      return node;
    }
  },
  User: {}
};
