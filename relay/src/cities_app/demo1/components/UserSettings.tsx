import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";

type Props = {
  settings: any;
};

export const UserSettings = styled.section``;

export default createFragmentContainer(
  ({ settings }: Props) => {
    return <UserSettings>{settings.citiesPaginationPageSize}</UserSettings>;
  },
  {
    settings: graphql`
      fragment UserSettings_settings on UserSettings {
        citiesPaginationPageSize
      }
    `
  }
);
