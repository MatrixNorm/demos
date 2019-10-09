import citiesData from "./data";

export default {
  Query: {
    randomCity: () => {
      const index = Math.floor(citiesData.length * Math.random())
      return citiesData[index]
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};