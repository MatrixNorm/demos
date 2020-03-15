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
  const [isDiff, setIsDiff] = useState<any>({});

  const handleCitiesPaginationPageSize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let citiesPaginationPageSize = Number(e.target.value);
    setLocCache({
      ...locCache,
      citiesPaginationPageSize
    });
    setIsDiff({
      citiesPaginationPageSize:
        user.settings.citiesPaginationPageSize !== citiesPaginationPageSize
    });
  };

  const handleFoo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let foo = e.target.value;
    setLocCache({
      ...locCache,
      foo
    });
    setIsDiff({
      foo: user.settings.foo !== foo
    });
  };

  const handleBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let bar = Number(e.target.value);
    setLocCache({
      ...locCache,
      bar
    });
    setIsDiff({
      bar: user.settings.bar !== bar
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
      <Section
        test-id="pagination-page-size-section"
        className={isDiff.citiesPaginationPageSize ? "editing" : ""}
      >
        <span>Pagination Page Size</span>
        <NumberInput
          step="1"
          value={locCache.citiesPaginationPageSize}
          onChange={handleCitiesPaginationPageSize}
          test-id="pagination-page-size-input"
        />
      </Section>
      <Section test-id="foo-section" className={isDiff.foo ? "editing" : ""}>
        <span>Foo</span>
        <TextInput
          value={locCache.foo}
          onChange={handleFoo}
          test-id="foo-input"
        />
      </Section>
      <Section test-id="bar-section" className={isDiff.bar ? "editing" : ""}>
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
        className={Object.values(isDiff).some(Boolean) ? "editing" : ""}
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
