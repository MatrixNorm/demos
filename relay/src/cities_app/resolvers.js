export const serverResolvers = {
  Query: {
    viewer: () => {
      return { id: 1 };
    },
    node: (_, { id }) => {
      console.log({ id });
      return { id };
    },
    citiesPagination: (parent, args) => {
      console.log(citiesPagination);
      return {};
    },
    citiesMetadata: () => {
      return {
        countries: ["A", "B"],
        population_lower_bound: 123,
        population_upper_bound: 9999,
        lat_lower_bound: 0.2,
        lat_upper_bound: 60.7,
        lng_lower_bound: 20.6,
        lng_upper_bound: 80.9
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
      return;
    }
  }
};
