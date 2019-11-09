const localState = {
  postListing: {
    "postListing#1": {
      id: "postListing#1",
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
    "postListing#2": {
      id: "postListing#2",
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
    configuration: dbObj.sorting.map(field => {
      const x = dbObj.orders[field];
      return {...x, order: {...x}}
    })
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
    postListing: (parent, { id }) => {
      console.log("postListing", id);
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
