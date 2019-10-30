import data from "./data";

export default {
  Query: {
    viewer: () => {
      return {};
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  },
  Viewer: {
    citiesPagination: (up, { continent, pageNo }) => {
      console.log(continent, pageNo)
      const pageSize = 5;
      const cities = data[continent];
      const begNdx = pageNo * pageSize;
      const endNdx = (pageNo + 1) * pageSize - 1;
      return {
        nodes: cities.slice(begNdx, endNdx),
        pageNo: pageNo,
        hasNextPage: endNdx < cities.length - 1,
        hasPrevPage: begNdx > 0
      };
    }
  }
};
