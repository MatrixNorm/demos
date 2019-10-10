import * as _ from "lodash";
import citiesData from "./data";
import * as pagination from "../utils/pagination";

const citiesByName = _.sortBy(citiesData, c => c.name);

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
