import Dexie from "dexie";
import db from "./db";

export const serverResolvers = {
  Query: {
    viewer: () => {
      return { id: 1 };
    },
    node: (_, { id }) => {
      console.log({ id });
      return { id };
    },
    citiesPagination: async (parent, args) => {
      console.log("citiesPagination", parent, args);
      const pageSize = 5;
      const nodes = await db
        .table("cities")
        .where("population")
        .above(Dexie.minKey)
        .offset(args.pageNo * pageSize)
        .limit(pageSize)
        .toArray();
      return {
        nodes,
        pageNo: args.pageNo,
        hasNextPage: true,
        hasPrevPage: false
      };
    },
    citiesMetadata: async () => {
      const t = db.table("cities");
      return {
        population_lower_bound: (await t.orderBy("population").first())
          .population,
        population_upper_bound: (await t.orderBy("population").last())
          .population,
        lat_lower_bound: (await t.orderBy("lat").first()).lat,
        lat_upper_bound: (await t.orderBy("lat").last()).lat,
        lng_lower_bound: (await t.orderBy("lng").first()).lng,
        lng_upper_bound: (await t.orderBy("lng").last()).lng
      };
    }
  },
  Node: {
    __resolveType(node) {
      console.log({ node });
      return node;
    }
  },
  User: {
    cityFilters: () => {
      return;
    }
  }
};
