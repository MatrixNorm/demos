import data from "./data";

const localSettings = {
  selectedContinent: "Europe",
  allContinents: ["Europe", "NorthAmerica"]
}

export const clientResolvers = {
  Query: {
    localSettings: () => {
      return {};
    }
  },
  LocalSettings: {
    selectedContinent: () => {
      return localSettings.selectedContinent;
    },
    allContinents: () => {
      return localSettings.allContinents;
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  },
  Mutation: {
    updateSelectedContinent: (_, { continent }) => {
      localSettings.selectedContinent = continent;
      return continent
    }
  }
};

export const serverResolvers = {
  Query: {
    viewer: () => {
      return {};
    },
    test: () => {
      return "QWERTY";
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  },
  Viewer: {
    citiesPagination: (up, { continent, pageNo }) => {
      console.log(continent, pageNo);
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
