import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import ChangeCitiesPaginationPageSizeMutation from "../mutations/ChangeCitiesPaginationPageSizeMutation";
import { NumberInput } from "../elements/Inputs";

type Props = {
  user: any;
  relay: any;
};

export const UserSettings = styled.section``;

export default createFragmentContainer(
  ({ user, relay }: Props) => {
    const handlePaginationPageSizeChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      ChangeCitiesPaginationPageSizeMutation.commit({
        environment: relay.environment,
        input: { pageSize: Number(e.target.value), userId: user.id }
      });
    };
    return (
      <UserSettings>
        <span>Pagination Page Size: </span>
        <NumberInput
          step="1"
          value={user.settings.citiesPaginationPageSize}
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
        }
      }
    `
  }
);
