import * as React from "react";
import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import UpdateUserSettingsMutation from "../mutations/UpdateUserSettingsMutation";
import { NumberInput, TextInput } from "../elements/Inputs";
import { SubmitButton } from "../elements/Buttons";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { UpdateUserSettingsInput } from "__relay__/UpdateUserSettingsMutation.graphql";

type Props = {
  user: UserSettings_user;
  relay: any;
};
type UserSettingsType = UserSettings_user["settings"];

export const UserSettings = styled.section``;
export const Section = styled.section``;

export const UserSettingsComponent = ({ user, relay }: Props) => {
  const [locCache, setLocCache] = useState(user.settings);
  console.log("UserSettingsComponent", user.settings, locCache);

  const diff = (attr: keyof UserSettingsType | null) => {
    if (attr) {
      return user.settings[attr] !== locCache[attr];
    }
    return Object.keys(user.settings)
      .map(attr => user.settings[attr] !== locCache[attr])
      .some(Boolean);
  };

  const handleCitiesPaginationPageSize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let citiesPaginationPageSize = Number(e.target.value);
    setLocCache({
      ...locCache,
      citiesPaginationPageSize
    });
  };

  const handleFoo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let foo = e.target.value;
    setLocCache({
      ...locCache,
      foo
    });
  };

  const handleBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let bar = Number(e.target.value);
    setLocCache({
      ...locCache,
      bar
    });
    // setIsDiff({
    //   bar: user.settings.bar !== bar
    // });
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
          ...diff
        },
        currentSettings: user.settings
      });
    }
  };

  return (
    <UserSettings>
      <Section
        test-id="cities-pagination-page-size-section"
        className={diff("citiesPaginationPageSize") ? "editing" : ""}
      >
        <span>Pagination Page Size</span>
        <NumberInput
          step="1"
          value={locCache.citiesPaginationPageSize}
          onChange={handleCitiesPaginationPageSize}
          test-id="cities-pagination-page-size-input"
        />
      </Section>
      <Section test-id="foo-section" className={diff("foo") ? "editing" : ""}>
        <span>Foo</span>
        <TextInput
          value={locCache.foo}
          onChange={handleFoo}
          test-id="foo-input"
        />
      </Section>
      <Section test-id="bar-section" className={diff("bar") ? "editing" : ""}>
        <span>Bar</span>
        <NumberInput
          step="1"
          value={locCache.bar}
          onChange={handleBar}
          test-id="bar-input"
        />
      </Section>
      <SubmitButton
        onClick={handleSubmit}
        test-id="submit-button"
        className={diff(null) ? "editing" : ""}
      >
        Save
      </SubmitButton>
    </UserSettings>
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
  `
});
