import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "raw-loader!./schema.graphql";
import citiesData from "./data";

const resolvers = {
  Query: {
    cities: (_, args) => {
      const nodes = citiesData.slice(0, args.first || 5);
      const edges = nodes.map(node => ({ node, cursor: node.id }));
      const pageInfo = {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: nodes[0].id,
        endCursor: nodes[nodes.length - 1].id
      };
      return { edges, pageInfo };
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });
