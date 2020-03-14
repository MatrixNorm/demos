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

export const UserSettings = styled.section``;
export const Section = styled.section``;

export const UserSettingsComponent = ({ user, relay }: Props) => {
  console.log("UserSettings component", user.settings);
  const [locCache, setLocCache] = useState(user.settings);

  const handleCitiesPaginationPageSize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocCache({
      ...locCache,
      citiesPaginationPageSize: Number(e.target.value)
    });
  };

  const handleFoo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocCache({
      ...locCache,
      foo: e.target.value
    });
  };

  const handleBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocCache({
      ...locCache,
      bar: Number(e.target.value)
    });
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
      <Section>
        <span>Pagination Page Size</span>
        <NumberInput
          step="1"
          value={locCache.citiesPaginationPageSize}
          onChange={handleCitiesPaginationPageSize}
          test-id="pagination-page-size-input"
        />
      </Section>
      <Section>
        <span>Foo</span>
        <TextInput
          value={locCache.foo}
          onChange={handleFoo}
          test-id="foo-input"
        />
      </Section>
      <Section>
        <span>Bar</span>
        <NumberInput
          step="1"
          value={locCache.bar}
          onChange={handleBar}
          test-id="bar-input"
        />
      </Section>
      <SubmitButton onClick={handleSubmit}>Save</SubmitButton>
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
