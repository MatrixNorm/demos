import * as React from "react";
import { useState } from "react";
import { QueryRenderer, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import UserSettings, { defaultData } from "../components/UserSettings";
import { Reload, withReaload } from "../elements/LoadingError";
import {
  LoadingPlaceholder,
  LoadingPlaceholderQueryRenderer,
} from "../LoadingContext";
import { SettingsPageQuery } from "__relay__/SettingsPageQuery.graphql";

type Props = {
  environment: IEnvironment;
};

function SettingsPage({ environment }: Props) {
  return (
    <LoadingPlaceholderQueryRenderer
      query={graphql`
        query SettingsPageQuery {
          viewer {
            ...UserSettings_user
          }
        }
      `}
      environment={environment}
      variables={{}}
      placeholderData={{
        viewer: { ...defaultData },
      }}
      render={({ props }: any) => {
        return props && props.viewer && <UserSettings user={props.viewer} />;
      }}
    />
  );
}

export default withReaload(SettingsPage);
