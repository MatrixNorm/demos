import * as _ from "lodash";
import citiesData from "./data";
import { paginate } from "../utils/pagination";

const citiesByName = _.sortBy(citiesData, c => c.name);

export default {
  Query: {
    allCities: (_, args) => {
      console.log(args);
      return paginate(citiesByName, args);
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};
