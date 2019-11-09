const localState = {
  postListing: {
    "1": {
      id: "1",
      sorting: ["createdAt", "viewsCount"],
      orders: {
        createdAt: {
          field: "createdAt",
          desc: false,
          fieldDescription_ASC: "AAA",
          fieldDescription_DESC: "BBB",
          isActive: true
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
          fieldDescription_DESC: "YYY",
          isActive: true
        }
      }
    }
  }
};

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
      return x.sorting(field => x.orders[field]);
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
      localState.postListing[input.postListingId].activeField =
        input.activeField;
      return { ...input };
    },
    togglePostListingDirection: (_, { input }) => {
      console.log(input);
      const activeField =
        localState.postListing[input.postListingId].activeField;
      return { ...input };
    }
  }
};
