import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import UserSettings from "../components/UserSettings";
import { SettingsPageQuery } from "__relay__/SettingsPageQuery.graphql";

type Props = {
  environment: IEnvironment;
};

export default function SettingsPage({ environment }: Props) {
  return (
    <QueryRenderer<SettingsPageQuery>
      query={graphql`
        query SettingsPageQuery {
          viewer {
            ...UserSettings_user
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ props }) => {
        return props && props.viewer && <UserSettings user={props.viewer} />;
      }}
    />
  );
}
