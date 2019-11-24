export default {
  Query: {
    viewer: () => {
      return {};
    },
    node: (_, { id }) => {
      return { id };
    }
  },
  Viewer: {
    searchCountries: ({ query, limit }) => {
      return ["Foo", "Bar"];
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};
