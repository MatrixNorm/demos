import * as React from "react";
import { graphql, createFragmentContainer, RelayProp } from "react-relay";
import UpdateUserSettingsMutation from "../mutations/UpdateUserSettingsMutation";
import UserSettingsPresentational from "./UserSettingsPresentational";
import { useLocalCache } from "../helpers/ComponentLocalCacheHook";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { UpdateUserSettingsInput } from "__relay__/UpdateUserSettingsMutation.graphql";

export type UserSettingsType = UserSettings_user["settings"];

type Props = {
  user: UserSettings_user;
  relay: RelayProp;
};

export const UserSettingsComponent = ({ user, relay }: Props) => {
  const [locCache, setLocCache, isEdited, getDelta] = useLocalCache<
    UserSettingsType
  >(user.settings);

  const handleSubmit = () => {
    const delta = getDelta();
    if (Object.values(delta).length > 0) {
      UpdateUserSettingsMutation.commit({
        environment: relay.environment,
        input: {
          userId: user.id,
          ...delta,
        },
        currentSettings: user.settings,
      });
    }
  };

  function abc(attr: keyof UserSettingsType) {
    return {
      value: locCache[attr],
      isEdited: isEdited(attr),
      onChange: (value: any) => {
        setLocCache({
          ...locCache,
          [attr]: value,
        });
      },
    };
  }

  return (
    <UserSettingsPresentational
      fields={{
        citiesPaginationPageSize: abc("citiesPaginationPageSize"),
        foo: abc("foo"),
        bar: abc("bar"),
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
    foo: "a",
    bar: 1,
  },
};
