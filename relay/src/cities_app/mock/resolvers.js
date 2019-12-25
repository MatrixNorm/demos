import citiesTxt from "raw-loader!theapp/resources/cities.json.txt";
// import { a2 } from "shadow-cljs/theapp.foo";
// window.a2 = a2

const cities = JSON.parse(citiesTxt);
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
      let pageSize = 5;
      let j = Math.floor(Math.random() * cities.length);
      let nodes = cities.slice(j, j + pageSize);
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
  User: {
    citiesPaginationWithPinnedFilter: () => {
      let pageSize = 5;
      let j = Math.floor(Math.random() * cities.length);
      let nodes = cities.slice(j, j + pageSize);
      return {
        nodes,
        pageNo: 0,
        hasNextPage: true,
        hasPrevPage: false
      };
    },
    cityFilters: () => {
      return [];
    }
  }
};
