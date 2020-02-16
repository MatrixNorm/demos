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

export default createFragmentContainer(
  ({ user, relay }: Props) => {
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
      UpdateUserSettingsMutation.commit({
        environment: relay.environment,
        input: {
          userId: user.id,
          ...locCache
        }
      });
    };
    return (
      <UserSettings>
        <span>Pagination Page Size: </span>
        <NumberInput
          step="1"
          value={user.settings.citiesPaginationPageSize}
          onChange={handleCitiesPaginationPageSize}
        />
        <span>Foo: </span>
        <TextInput value={user.settings.foo} onChange={handleFoo} />
        <span>Bar: </span>
        <NumberInput step="1" value={user.settings.bar} onChange={handleBar} />
        <SubmitButton onChange={handleSubmit}>Save</SubmitButton>
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
