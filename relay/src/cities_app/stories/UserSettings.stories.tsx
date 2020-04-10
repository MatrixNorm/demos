import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv, createRelayEnvironment } from "../env";
import UserSettings from "../components/UserSettings";
import { UserSettingsStoryQuery } from "__relay__/UserSettingsStoryQuery.graphql";

export default { title: "cities_app-demo1/UserSettings" };

const query1 = graphql`
  query UserSettingsStoryQuery($userId: ID!) {
    node(id: $userId) {
      ... on User {
        ...UserSettings_user
      }
    }
  }
`;

const query2 = graphql`
  query UserSettingsStory2Query($userId: ID!) {
    node(id: $userId) {
      ... on User {
        settings {
          citiesPaginationPageSize
          foo
          bar
        }
      }
    }
  }
`;

export const demo1 = () => {
  let nodes: any = {
    "user#777": {
      id: "user#777",
      __type: "User",
      name: "Nik",
      settings: {
        citiesPaginationPageSize: 10,
        foo: "Hello, Nik",
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
        return { user: nodes[userId] };
      }
    }
  });
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <>
      <QueryRenderer<UserSettingsStoryQuery>
        query={query1}
        environment={environment}
        variables={{ userId: "user#777" }}
        render={({ props }) => {
          return props && props.node && <UserSettings user={props.node} />;
        }}
      />
      <QueryRenderer<any>
        query={query2}
        environment={environment}
        variables={{ userId: "user#777" }}
        render={({ props }) => {
          return (
            props &&
            props.node && <pre>{JSON.stringify(props.node.settings, null, 2)}</pre>
          );
        }}
      />
    </>
  );
};

export const full = () => {
  const environment = createRelayEnvironment();
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <>
      <QueryRenderer<UserSettingsStoryQuery>
        query={query1}
        environment={environment}
        variables={{ userId: "user#1" }}
        render={({ props }) => {
          return props && props.node && <UserSettings user={props.node} />;
        }}
      />
      <QueryRenderer<any>
        query={query2}
        environment={environment}
        variables={{ userId: "user#1" }}
        render={({ props }) => {
          return (
            props &&
            props.node && <div>{JSON.stringify(props.node.settings)}</div>
          );
        }}
      />
    </>
  );
};
