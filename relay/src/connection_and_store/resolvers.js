import citiesData from "./data";

const citiesByName = citiesData.sort((a, b) => a.name < b.name);

export default {
  Query: {
    allCities: (_, args) => {
      const { after, first, before, last } = args;
      if (first) {
        const startIndex = after
          ? citiesByName.findIndex(city => city.id === after)
          : 0;
        const endIndex = startIndex + first;
        const nodes = citiesByName.slice(startIndex, endIndex);
        const edges = nodes.map(node => ({
          node,
          cursor: node.id
        }));
        return {
          edges,
          pageInfo: {
            hasNextPage: endIndex < citiesByName.length,
            hasPreviousPage: startIndex > 0,
            startCursor: nodes[0]?.id,
            endCursor: nodes[nodes.length - 1]?.id
          }
        };
      }
      if (last && before) {
        const endIndex = citiesByName.findIndex(city => city.id === before);
      }
      throw "cannot paginate";
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};
