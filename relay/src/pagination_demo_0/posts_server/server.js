// @flow

import db, { getIndex } from "./database";
import type {
  Node,
  User,
  PostOrderingInput,
  PostSearchPostsArgs,
  QueryNodeArgs,
  PageInfo,
  PostEdge
} from "./graphql.types";
//import { PostOrderingValues } from './graphql.types'

function paginate({
  itemId,
  count,
  orderBy
}: {
  itemId: ?string,
  count: number,
  orderBy: PostOrderingInput
}) {
  console.log(itemId, count, orderBy);
  const { items: nodes, hasNext, hasPrev } = getIndex(orderBy).get({
    itemId,
    count
  });

  const edges: PostEdge[] = nodes.map(node => ({
    node,
    cursor: encodeCursor(node.id, orderBy)
  }));

  const pageInfo: PageInfo = {
    hasNextPage: hasNext,
    endCursor: edges[edges.length - 1]?.cursor,
    hasPreviousPage: hasPrev,
    startCursor: edges[0]?.cursor
  };

  return { edges, pageInfo, orderBy };
}

export function decodeCursor(cursor: string): [string, PostOrderingInput] {
  const json = JSON.parse(cursor);
  const { nodeId, orderedByField, desc } = json;
  if (!nodeId) {
    throw `Invalid cursor: nodeId is required`;
  }
  // WTF we have PostOrderingValues after all
  if (!(orderedByField === "createdAt" || orderedByField === "viewsCount")) {
    throw `Invalid cursor: bad orderedByField`;
  }
  return [nodeId, { field: orderedByField, desc: desc || false }];
}

export function encodeCursor(nodeId: string, orderBy: PostOrderingInput) {
  const { field, desc } = orderBy;
  return JSON.stringify({ nodeId, orderedByField: field, desc: desc || false });
}

const resolvers = {
  Query: {
    node: (_: mixed, { id }: QueryNodeArgs) => {
      /*
        type Query {
          node(id: ID!): Node
        }
      */
      if (id.startsWith("post")) {
        return db.posts.byId[id];
      }
      if (id.startsWith("user")) {
        return db.users.byId[id];
      }
      return null;
    },
    viewer: () => {
      return {};
    }
  },
  Viewer: {
    postConnection: (_: mixed, args: PostSearchPostsArgs) => {
      //console.log(args)
      const { first, after, last, before, orderBy } = args;

      let count, cursor;

      if (first) {
        count = first;
        cursor = after;
      } else if (last) {
        count = -1 * last;
        cursor = before;
      } else {
        throw `Unable to paginate ${args.toString()}`;
      }

      if (cursor) {
        const [postId, orderBy] = decodeCursor(cursor);
        return paginate({ itemId: postId, count, orderBy });
      }
      if (orderBy) {
        return paginate({ itemId: null, count, orderBy });
      }
      throw `Unable to paginate ${args.toString()}`;
    }
  },
  Node: {
    __resolveType(node: Node) {
      if (node.id.startsWith("post")) {
        return "Post";
      }
      if (node.id.startsWith("user")) {
        return "User";
      }
      return null;
    }
  },
  Post: {
    author: (post: { authorId: string }) => {
      return db.users.byId[post.authorId];
    }
  },
  User: {
    posts: (user: User) => {
      return Object.values(db.posts.byId).filter(p => p.authorId == user.id);
    }
  }
};

export default resolvers;
