const localState = {
  postListing: {
    "1": {
      id: "1",
      activeField: "createdAt",
      allOrderings: [
        {
          field: "createdAt",
          desc: false,
          fieldDescription_ASC: "AAA",
          fieldDescription_DESC: "BBB"
        },
        {
          field: "viewsCount",
          desc: false,
          fieldDescription_ASC: "XXX",
          fieldDescription_DESC: "YYY"
        }
      ]
    },
    "2": {
      id: "2",
      activeField: "createdAt",
      allOrderings: [
        {
          field: "createdAt",
          desc: false,
          fieldDescription_ASC: "AAA",
          fieldDescription_DESC: "BBB"
        },
        {
          field: "viewsCount",
          desc: false,
          fieldDescription_ASC: "XXX",
          fieldDescription_DESC: "YYY"
        }
      ]
    }
  }
};

export const clientResolvers = {
  Query: {
    localState: (_, { id }) => {
      return { id };
    }
  },
  LocalState: {
    activeField: ({ id }) => {
      return localState.postListing[id].activeField;
    },
    allOrderings: ({ id }) => {
      return localState.postListing[id].allOrderings;
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
      const activeField = localState.postListing[input.postListingId].activeField;
      return { ...input };
    }
  }
};
