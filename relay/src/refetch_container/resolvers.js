import cities from "./cities";

export const serverResolvers = {
  Query: {
    cities: (_, { pageNo }) => {
      console.log("resolvers", pageNo);
      let pageSize = 5;
      let nodes = cities.slice(pageNo * pageSize, pageNo * pageSize + pageSize);
      return {
        nodes,
        pageNo,
        hasNextPage: pageNo * pageSize < cities.length,
        hasPrevPage: pageNo > 0
      };
    }
  },
  Node: {
    __resolveType(node) {
      console.log({ node });
      return node;
    }
  }
};
