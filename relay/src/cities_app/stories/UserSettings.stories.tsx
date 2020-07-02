import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createAsyncTestingEnv } from "../env";
import UserSettings from "../components/UserSettings";
import { UserSettingsStoryQuery } from "__relay__/UserSettingsStoryQuery.graphql";

export default { title: "cities_app-demo1/UserSettings" };

const query = graphql`
  query UserSettingsStoryQuery {
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
      userSettingsOptimisticDelta {
        ...UserSettings_optimisticDelta
      }
    }
  }
`;

export const demo1 = () => {
  let user = {
    id: "user#777",
    __type: "User",
    name: "Nik",
    settings: {
      citiesPaginationPageSize: 10,
      foo: "foo value",
      bar: 99,
    },
  };
  const environment = createAsyncTestingEnv(1000, {
    Query: {
      viewer() {
        return user;
      },
    },
    Mutation: {
      updateUserSettings(_: any, { input }: any) {
        for (let field of ["citiesPaginationPageSize", "foo", "bar"]) {
          if (input[field]) {
            // @ts-ignore
            user.settings[field] = input[field];
          }
        }
        user.settings["foo"] = "new foo";
        return { user };
      },
    },
  });
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <QueryRenderer<UserSettingsStoryQuery>
      query={query}
      environment={environment}
      variables={{}}
      render={({ props }) => {
        return (
          props &&
          props.viewer && (
            <UserSettings
              settings={props.viewer.settings}
              editDelta={props.uiState?.userSettingsEditDelta || null}
              optimisticDelta={props.uiState?.userSettingsOptimisticDelta || null}
            />
          )
        );
      }}
    />
  );
};
