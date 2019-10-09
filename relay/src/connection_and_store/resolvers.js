import citiesData from "./data";
import * as pagination from "../utils/pagination";

const citiesByName = citiesData.sort((a, b) => a.name < b.name);

export default {
  Query: {
    allCities: (_, args) => {
      return pagination(citiesByName, args);
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};
