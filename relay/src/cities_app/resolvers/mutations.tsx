import * as db from "./database";
import * as t from "../types.codegen";

export default {
  updateUserSettings(
    _: any,
    { input }: { input: t.UpdateUserSettingsInput }
  ): t.UpdateUserSettingsPayload {
    let { userId, citiesPaginationPageSize, foo, bar } = input;
    let user = db.users[userId];
    if (!user) {
      throw new Error("Bad userId");
    }
    if (citiesPaginationPageSize) {
      user.settings.citiesPaginationPageSize = citiesPaginationPageSize;
    }
    if (foo) {
      user.settings.foo = foo;
    }
    if (bar) {
      user.settings.bar = bar;
    }
    return { user };
  }
};
