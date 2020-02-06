import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import ChangeCitiesPaginationPageSizeMutation from "../mutations/ChangeCitiesPaginationPageSizeMutation";
import { NumberInput } from "../elements/Inputs";

type Props = {
  settings: any;
  viewer: any;
  relay: any;
};

export const UserSettings = styled.section``;

export default createFragmentContainer(
  ({ settings, viewer, relay }: Props) => {
    const handlePaginationPageSizeChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log(e);
      ChangeCitiesPaginationPageSizeMutation.commit({
        environment: relay.environment,
        pageSize: e.target.value,
        userId: viewer.id
      });
    };
    return (
      <UserSettings>
        <span>Pagination Page Size: </span>
        <NumberInput
          step="1"
          value={settings.citiesPaginationPageSize}
          onChange={handlePaginationPageSizeChange}
        />
      </UserSettings>
    );
  },
  {
    settings: graphql`
      fragment UserSettings_settings on UserSettings {
        citiesPaginationPageSize
      }
    `,
    viewer: graphql`
      fragment UserSettings_viewer on User {
        id
      }
    `
  }
);
