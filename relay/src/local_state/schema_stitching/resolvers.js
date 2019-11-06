import { print } from 'graphql/language/printer'
import data from "./data";

export default {
  Query: {
    viewer: () => {
      console.log("viewer");
      return {};
    },
    localSettings: () => {
      console.log("localSettings");
      return {};
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};
