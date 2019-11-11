import data from "./data";

const localSettings = {
  id: "localSettings#singleton",
  selectedContinent: "Europe",
  allContinents: ["Europe", "NorthAmerica"]
};

export const clientResolvers = {
  Query: {
    localSettings: () => {
      return { id: localSettings.id };
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
    updateSelectedContinent: (_, args) => {
      console.log(args);
      localSettings.selectedContinent = args.input.continent;
      return { continent: localSettings.selectedContinent };
    }
  }
};

export const serverResolvers = {
  Query: {
    viewer: () => {
      return {};
    },
    node: (_, { id }) => {
      console.log({ id });
      return { id };
    }
  },
  Node: {
    __resolveType(node) {
      console.log({ node });
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
