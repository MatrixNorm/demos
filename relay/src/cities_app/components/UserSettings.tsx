import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import UpdateUserSettingsMutation from "../mutations/UpdateUserSettingsMutation";
import { NumberInput } from "../elements/Inputs";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";

type Props = {
  user: UserSettings_user;
  relay: any;
};

export const UserSettings = styled.section``;

export default createFragmentContainer(
  ({ user, relay }: Props) => {
    const handlePaginationPageSizeChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      UpdateUserSettingsMutation.commit({
        environment: relay.environment,
        input: {
          userId: user.id,
          citiesPaginationPageSize: Number(e.target.value)
        }
      });
    };
    return (
      <UserSettings>
        <span>Pagination Page Size: </span>
        <NumberInput
          step="1"
          value={user.settings?.citiesPaginationPageSize || ""}
          onChange={handlePaginationPageSizeChange}
        />
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
