import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv, createRelayEnvironment } from "../env";
import UserSettings from "../components/UserSettings";
import { UserSettingsStoryQuery } from "__relay__/UserSettingsStoryQuery.graphql";

export default { title: "cities_app-demo1/UserSettings" };

const query1 = graphql`
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
    }
  }
`;

const query2 = graphql`
  query UserSettingsStory2Query {
    viewer {
      id
      settings {
        citiesPaginationPageSize
        foo
        bar
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
      bar: 11,
    },
  };
  const environment = createTestingEnv({
    Query: {
      viewer() {
        return user;
      },
    },
    Mutation: {
      updateUserSettings(_: any, { input }: any) {
        let { citiesPaginationPageSize, foo, bar } = input;

        if (citiesPaginationPageSize) {
          user.settings.citiesPaginationPageSize = citiesPaginationPageSize;
        }
        if (foo) {
          user.settings.foo = foo;
        }
        if (bar) {
          user.settings.bar = bar;
        }
        return { user };
      },
    },
  });
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <>
      <QueryRenderer<UserSettingsStoryQuery>
        query={query1}
        environment={environment}
        variables={{}}
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
      {/* <QueryRenderer<any>
        query={query2}
        environment={environment}
        variables={{ userId: "user#777" }}
        render={({ props }) => {
          return (
            props &&
            props.node && <pre>{JSON.stringify(props.node.settings, null, 2)}</pre>
          );
        }}
      /> */}
    </>
  );
};

// export const full = () => {
//   const environment = createRelayEnvironment();
//   //@ts-ignore
//   window.relayStore = environment.getStore().getSource()._records;
//   return (
//     <>
//       <QueryRenderer<UserSettingsStoryQuery>
//         query={query1}
//         environment={environment}
//         variables={{ userId: "user#1" }}
//         render={({ props }) => {
//           return props && props.node && <UserSettings user={props.node} />;
//         }}
//       />
//       <QueryRenderer<any>
//         query={query2}
//         environment={environment}
//         variables={{ userId: "user#1" }}
//         render={({ props }) => {
//           return props && props.node && <div>{JSON.stringify(props.node.settings)}</div>;
//         }}
//       />
//     </>
//   );
// };
