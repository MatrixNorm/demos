import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createAsyncTestingEnv, createFakeServerEnvironment } from "../env";
import UserSettings from "../components/UserSettings";
import RequestViewer from "./RequestViewer";
import { UserSettingsStoryQuery } from "__relay__/UserSettingsStoryQuery.graphql";

export default {
  title: "cities_app-demo1/UserSettings",
  excludeStories: ["createResolvers"],
};

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

export function createResolvers() {
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
  return {
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
        return { user };
      },
    },
  };
}

export const demo1 = () => {
  const environment = createAsyncTestingEnv(100, createResolvers());
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

export const demo2 = () => {
  const { server, environment } = createFakeServerEnvironment(createResolvers());
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <>
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
      <RequestViewer server={server} />
    </>
  );
};
