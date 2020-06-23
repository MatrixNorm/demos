import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import UserSettings, { defaultData } from "../components/UserSettings";
import { Reload, withReaload } from "../elements/LoadingError";
import { LoadingPlaceholder, LoadingPlaceholderQueryRenderer } from "../LoadingContext";
import { SettingsPageQuery } from "__relay__/SettingsPageQuery.graphql";

type Props = {
  environment: IEnvironment;
};

function SettingsPage({ environment }: Props) {
  return (
    <LoadingPlaceholderQueryRenderer<SettingsPageQuery>
      query={graphql`
        query SettingsPageQuery {
          viewer {
            id
            settings {
              ...UserSettings_settings
            }
          }
          uiState {
            userSettingsEditDelta {
              ...UserSettings_editDelta
            }
          }
        }
      `}
      environment={environment}
      variables={{}}
      placeholderData={{
        viewer: { id: "1", ...defaultData },
        uiState: null,
      }}
      render={({ props }) => {
        return (
          props &&
          props.viewer && (
            <UserSettings
              settings={props.viewer.settings}
              editDelta={props.uiState?.userSettingsEditDelta || null}
            />
          )
        );
      }}
    />
  );
}

export default withReaload(SettingsPage);
