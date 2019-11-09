const localState = {
  postListing: {
    "1": {
      id: "1",
      activeField: "createdAt",
      sorting: ["createdAt", "viewsCount"],
      orders: {
        createdAt: {
          field: "createdAt",
          desc: false,
          fieldDescription_ASC: "AAA",
          fieldDescription_DESC: "BBB"
        },
        viewsCount: {
          field: "viewsCount",
          desc: false,
          fieldDescription_ASC: "XXX",
          fieldDescription_DESC: "YYY"
        }
      }
    },
    "2": {
      id: "2",
      activeField: "viewsCount",
      sorting: ["createdAt", "viewsCount"],
      orders: {
        createdAt: {
          field: "createdAt",
          desc: false,
          fieldDescription_ASC: "AAA",
          fieldDescription_DESC: "BBB"
        },
        viewsCount: {
          field: "viewsCount",
          desc: false,
          fieldDescription_ASC: "XXX",
          fieldDescription_DESC: "YYY"
        }
      }
    }
  }
};

function postListingDbToGql(dbObj) {
  return {
    id: dbObj.id,
    activeField: dbObj.activeField,
    configuration: dbObj.sorting(field => dbObj.orders[field])
  };
}

export const clientResolvers = {
  Query: {
    localState: () => {
      console.log("localState");
      return {};
    }
  },
  LocalState: {
    postListing: ({ id }) => {
      console.log("postListing");
      const x = localState.postListing[id];
      return postListingDbToGql(x);
    }
  },
  Node: {
    __resolveType(node) {
      return node;
    }
  },
  Mutation: {
    changePostListingActiveField: (_, { input }) => {
      console.log(input);
      const x = localState.postListing[input.postListingId];
      x.activeField = input.activeField;
      return postListingDbToGql(x);
    },
    togglePostListingDirection: (_, { input }) => {
      console.log(input);
      const x = localState.postListing[input.postListingId];
      x.orders[x.activeField].desc = !x.orders[x.activeField].desc;
      return postListingDbToGql(x);
    }
  }
};
