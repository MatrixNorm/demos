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
        citiesPaginationPageSize: 10
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
      changeCitiesPaginationPageSize(_: any, { input }: any) {
        console.log(input);
        let { userId, pageSize } = input;
        nodes[userId].settings.citiesPaginationPageSize = pageSize;
        return nodes[userId];
      }
    }
  });
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
      render={({ error, props }) => {
        return props && props.node && <UserSettings user={props.node} />;
      }}
    />
  );
};
