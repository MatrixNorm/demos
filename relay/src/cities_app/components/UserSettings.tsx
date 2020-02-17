import * as React from "react";
import { useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import UpdateUserSettingsMutation from "../mutations/UpdateUserSettingsMutation";
import { NumberInput, TextInput } from "../elements/Inputs";
import { SubmitButton } from "../elements/Buttons";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";

type Props = {
  user: UserSettings_user;
  relay: any;
};

export const UserSettings = styled.section``;
export const Section = styled.section``;

export default createFragmentContainer(
  ({ user, relay }: Props) => {
    console.log('UserSettings component', user.settings)
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
      let diff = {};
      for (let attr of Object.keys(user.settings)) {
        if (locCache[attr] !== user.settings[attr]) {
          diff[attr] = locCache[attr];
        }
      }
      if (
        Object.values(diff).filter(v => v !== null && v !== undefined).length >
        0
      ) {
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
          <span>Pagination Page Size: </span>
          <NumberInput
            step="1"
            value={locCache.citiesPaginationPageSize}
            onChange={handleCitiesPaginationPageSize}
          />
        </Section>
        <Section>
          <span>Foo: </span>
          <TextInput value={locCache.foo} onChange={handleFoo} />
        </Section>
        <Section>
          <span>Bar: </span>
          <NumberInput step="1" value={locCache.bar} onChange={handleBar} />
        </Section>
        <SubmitButton onClick={handleSubmit}>Save</SubmitButton>
      </UserSettings>
    );
  },
  {
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
  }
);
