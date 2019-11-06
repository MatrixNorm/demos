import { print } from "graphql/language/printer";
import data from "./data";

export const clientResolvers = {
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
  LocalSettings: {
    selectedContinent: () => {
      return "Europe";
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};

export const serverResolvers = {
  Query: {
    viewer: () => {
      console.log("viewer");
      return {};
    },
    test: () => {
      return "QWERTY"
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};
