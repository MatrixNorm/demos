import citiesTxt from "raw-loader!theapp/resources/cities.json.txt";

const cities = JSON.parse(citiesTxt)

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
      const pageSize = 5;
      const nodes = []
      return {
        nodes,
        pageNo: 1,
        hasNextPage: true,
        hasPrevPage: false
      };
    },
    citiesMetadata: () => {
       return {
        population_lower_bound: 400000,
        population_upper_bound: 9000000,
        lat_lower_bound: 11.97,
        lat_upper_bound: 67.53,
        lng_lower_bound: 9.47,
        lng_upper_bound: 78.25
      };
    }
  },
  Node: {
    __resolveType(node) {
      console.log({ node });
      return node;
    }
  },
  User: {
    cityFilters: () => {
      return [];
    }
  }
};
