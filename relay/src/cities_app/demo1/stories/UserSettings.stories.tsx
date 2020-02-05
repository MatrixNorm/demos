import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import UserSettings from "../components/UserSettings";
import { UserSettingsStoryQuery } from "__relay__/UserSettingsStoryQuery.graphql";

export default { title: "cities_app-demo1/CitySummary" };

export const citySummary = () => {
  const environment = createTestingEnv({
    Query: {
      viewer: () => {
        return {
          id: "user#7",
          settings: {
            citiesPaginationPageSize: 10
          }
        };
      }
    },
    Node: {
      __resolveType() {
        return "City";
      }
    }
  });
  return (
    <QueryRenderer<UserSettingsStoryQuery>
      query={graphql`
        query UserSettingsStoryQuery() {
          viewer {
            settings {
              ...UserSettings_settings
            }
          }
        }
      `}
      environment={environment}
      variables={{ cityId: "city#1" }}
      render={({ error, props }) => {
        return (
          props &&
          props.viewer &&
          props.viewer.settings && (
            <UserSettings settings={props.viewer.settings} />
          )
        );
      }}
    />
  );
};
