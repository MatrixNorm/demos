import citiesPagination from "./citiesPagination";
import Mutts from "./mutations";
import * as db from "./database";
import * as t from "../types.codegen";

export const serverResolvers = {
  Query: {
    viewer: () => {
      // logged-in user
      return db.users["user#1"];
    },
    node: (_: any, { id }: t.Node) => {
      console.log(id);
      if (id.startsWith("user")) {
        return db.users[id];
      }
      if (id.startsWith("city")) {
        return db.cities.find(c => c.id === id);
      }
      return { id };
    },
    citiesPagination: (
      _: any,
      args: t.QueryCitiesPaginationArgs,
      context: { user: t.User }
    ): t.CitiesPagination => {
      return citiesPagination(
        db.cities,
        args,
        context.user.settings?.citiesPaginationPageSize || 3
      );
    },
    citiesMetadata: () => {
      return {
        ...db.citiesMetadata,
        latLowerBound: 11.97,
        latUpperBound: 67.53,
        lngLowerBound: 9.47,
        lngUpperBound: 78.25
      };
    },
    countries: (_: any, { searchString }: t.QueryCountriesArgs) => {
      return db.countries
        .filter(c => c.toLowerCase().includes(searchString))
        .slice(0, 8);
    }
  },
  Node: {
    __resolveType(node: t.Node) {
      if (node.id.startsWith("user")) {
        return "User";
      }
      if (node.id.startsWith("city")) {
        return "City";
      }
      return null;
    }
  },
  Mutation: Mutts
};
