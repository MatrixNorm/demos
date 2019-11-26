import { countryList } from "./data";

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
    searchCountries: (parent, { query, limit }) => {
      console.log(query)
      return countryList.filter(country =>
        country.toLowerCase().startsWith(query.toLowerCase())
      ).slice(0, 4);
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};
