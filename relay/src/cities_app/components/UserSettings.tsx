import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import UpdateUserSettingsMutation from "../mutations/UpdateUserSettingsMutation";
import UserSettingsPresentational from "./UserSettingsPresentational";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { UpdateUserSettingsInput } from "__relay__/UpdateUserSettingsMutation.graphql";

export type UserSettingsType = UserSettings_user["settings"];

type Props = {
  user: UserSettings_user;
  relay: any;
};

export const UserSettingsComponent = ({ user, relay }: Props) => {
  const [locCache, setLocCache] = useState(user.settings);
  //console.log("UserSettingsComponent", user.settings, locCache);
  const prevUserSettings = useRef<string | null>(null);

  useEffect(() => {
    const jsoned = JSON.stringify(user.settings);
    if (prevUserSettings.current !== jsoned) {
      if (prevUserSettings.current) {
        setLocCache(user.settings);
      }
      prevUserSettings.current = jsoned;
    }
  });

  const diff = (attr: keyof UserSettingsType | null) => {
    if (attr) {
      return user.settings[attr] !== locCache[attr];
    }
    return (
      Object.keys(user.settings)
        //@ts-ignore
        .map((attr) => user.settings[attr] !== locCache[attr])
        .some(Boolean)
    );
  };

  const makeHandler = (
    param: keyof UserSettingsType,
    transform: (_: string) => any = (x) => x
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = transform(e.target.value);
      setLocCache({
        ...locCache,
        [param]: value,
      });
    };
  };

  const handleSubmit = () => {
    const diff: Omit<UpdateUserSettingsInput, "userId"> = {};
    for (let attr of Object.keys(user.settings)) {
      //@ts-ignore
      if (locCache[attr] !== user.settings[attr]) {
        //@ts-ignore
        diff[attr] = locCache[attr];
      }
    }
    const isDiffReal = Object.values(diff).filter(Boolean).length > 0;
    if (isDiffReal) {
      UpdateUserSettingsMutation.commit({
        environment: relay.environment,
        input: {
          userId: user.id,
          ...diff,
        },
        currentSettings: user.settings,
      });
    }
  };

  return (
    <UserSettingsPresentational
      fields={{
        citiesPaginationPageSize: {
          value: locCache.citiesPaginationPageSize,
          isEdited: diff("citiesPaginationPageSize"),
          onChange: makeHandler("citiesPaginationPageSize", Number),
        },
        foo: {
          value: locCache.foo,
          isEdited: diff("foo"),
          onChange: makeHandler("foo"),
        },
        bar: {
          value: locCache.bar,
          isEdited: diff("bar"),
          onChange: makeHandler("bar", Number),
        },
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default createFragmentContainer(UserSettingsComponent, {
  user: graphql`
    fragment UserSettings_user on User {
      id
      settings {
        citiesPaginationPageSize
        foo
        bar
      }
    }
  `,
});

export const defaultData = {
  __typename: "User",
  id: "1",
  settings: {
    citiesPaginationPageSize: 5,
    foo: "",
    bar: 1,
  },
};
