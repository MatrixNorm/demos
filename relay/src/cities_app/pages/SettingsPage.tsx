import * as React from "react";
import { useState } from "react";
import { QueryRenderer, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import UserSettings, { defaultData } from "../components/UserSettings";
import { Reload } from "../elements/LoadingError";
import { LoadingPlaceholder } from "../LoadingContext";
import { SettingsPageQuery } from "__relay__/SettingsPageQuery.graphql";

type Props = {
  environment: IEnvironment;
};

export default function SettingsPage({ environment }: Props) {
  const [reload, setReload] = useState(false);
  const query = graphql`
    query SettingsPageQuery {
      viewer {
        ...UserSettings_user
      }
    }
  `;
  if (reload) {
    return (
      <Reload message="something went wrong" onClick={() => setReload(false)} />
    );
  }
  return (
    <QueryRenderer<SettingsPageQuery>
      query={query}
      environment={environment}
      variables={{}}
      render={({ props, error }) => {
        if (error) {
          setReload(true);
          return;
        }
        if (props === null) {
          return (
            <LoadingPlaceholder
              query={query}
              variables={{}}
              data={{
                viewer: { ...defaultData },
              }}
              render={({ props }: any) => {
                return (
                  props && props.viewer && <UserSettings user={props.viewer} />
                );
              }}
            />
          );
        }
        if (!props.viewer) {
          setReload(true);
          return;
        }
        return <UserSettings user={props.viewer} />;
      }}
    />
  );
}
