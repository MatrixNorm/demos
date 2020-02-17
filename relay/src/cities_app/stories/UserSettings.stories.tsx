import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import UserSettings from "../components/UserSettings";
import { UserSettingsStoryQuery } from "__relay__/UserSettingsStoryQuery.graphql";

export default { title: "cities_app-demo1/UserSettings" };

export const citySummary = () => {
  let nodes: { [key: string]: any } = {
    "user#777": {
      id: "user#777",
      __type: "User",
      name: "Nik",
      settings: {
        citiesPaginationPageSize: 10,
        foo: "Hello, Cunt",
        bar: 11
      }
    }
  };
  const environment = createTestingEnv({
    Query: {
      node(_: any, { id }: { id: string }) {
        return nodes[id];
      }
    },
    Node: {
      __resolveType(node: any) {
        return node.__type || null;
      }
    },
    Mutation: {
      updateUserSettings(_: any, { input }: any) {
        console.log(input);
        let { userId, citiesPaginationPageSize, foo, bar } = input;
        let settingsRef = nodes[userId].settings;
        if (citiesPaginationPageSize) {
          settingsRef.citiesPaginationPageSize = citiesPaginationPageSize;
        }
        if (foo) {
          settingsRef.foo = foo;
        }
        if (bar) {
          settingsRef.bar = bar;
        }
        console.log(nodes[userId]);
        return { user: nodes[userId] };
      }
    }
  });
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;

  return (
    <QueryRenderer<UserSettingsStoryQuery>
      query={graphql`
        query UserSettingsStoryQuery($userId: ID!) {
          node(id: $userId) {
            ... on User {
              ...UserSettings_user
            }
          }
        }
      `}
      environment={environment}
      variables={{ userId: "user#777" }}
      render={({ props }) => {
        return props && props.node && <UserSettings user={props.node} />;
      }}
    />
  );
};
