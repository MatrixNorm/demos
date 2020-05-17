import * as React from "react";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { graphql, QueryRenderer } from "react-relay";
import {
  Notification,
  Notifications,
  addNotification,
} from "../components/Notifications";
import { createTestingEnv } from "../env";

export default { title: "cities_app-demo1/Notifications" };

export const single = () => {
  const env = createMockEnvironment();
  setTimeout(() => {
    env.mock.resolveMostRecentOperation((operation: any) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UINotification() {
          return {
            id: "notification#1",
            kind: "INFO",
            text:
              "Updated settings saved without any problems. You can go and f. yourself.",
          };
        },
      });
      return payload;
    });
  }, 0);
  return (
    <QueryRenderer<any>
      query={graphql`
        query NotificationsStoryOneQuery @relay_test_operation {
          notification: node(id: "notification_id") {
            ...Notifications_notification
          }
        }
      `}
      environment={env}
      variables={{}}
      render={({ props }) => {
        return (
          props &&
          props.notification && (
            <Notification notification={props.notification} />
          )
        );
      }}
    />
  );
};

export const multiple = () => {
  const env = createMockEnvironment();
  setTimeout(() => {
    env.mock.resolveMostRecentOperation((operation: any) => {
      let payload = MockPayloadGenerator.generate(operation, {
        UIState() {
          return {
            id: "ui-state",
            notifications: [
              { id: "notification#1", kind: "INFO", text: "Lorem ipsum" },
              { id: "notification#2", kind: "ERROR", text: "This sucks" },
              {
                id: "notification#3",
                kind: "INFO",
                text: "Everything is tip-top",
              },
            ],
          };
        },
      });
      console.log({ operation, payload });
      return payload;
    });
  }, 0);
  //@ts-ignore
  window.relayStore = env.getStore().getSource()._records;
  return (
    <QueryRenderer<any>
      query={graphql`
        query NotificationsStoryManyQuery @relay_test_operation {
          __typename
          uiState {
            ...Notifications_state
          }
        }
      `}
      environment={env}
      variables={{}}
      render={({ props }) => {
        return (
          props && props.uiState && <Notifications state={props.uiState} />
        );
      }}
    />
  );
};

export const adding = () => {
  const environment = createTestingEnv({
    Query: {
      node(_: any, { id }: { id: string }) {
        return { id };
      },
    },
    Node: {
      __resolveType(node: any) {
        return node.__type || null;
      },
    },
  });
  //@ts-ignore
  window.relayEnv = environment;
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;

  let counter = 0;

  const handleAddNotification = () => {
    addNotification(
      {
        kind: "INFO",
        text: `Lorem-${counter}`,
      },
      environment
    );
    counter++;
  };
  const runGC = () => {
    //@ts-ignore
    environment.getStore().__gc();
  };

  return (
    <QueryRenderer<any>
      query={graphql`
        query NotificationsStoryAddingQuery {
          __typename
          uiState {
            ...Notifications_state
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ props }) => {
        return (
          props && (
            <>
              {props.uiState && <Notifications state={props.uiState} />}
              <br />
              <button onClick={handleAddNotification}>Add Notification</button>
              <br />
              <button onClick={runGC}>Run GC</button>
            </>
          )
        );
      }}
    />
  );
};

export const adding2 = () => {
  const env = createMockEnvironment();
  setTimeout(() => {
    env.mock.resolveMostRecentOperation((operation) => {
      let payload = MockPayloadGenerator.generate(operation, {
        ID(_, generateId) {
          return `uuid-${generateId()}`;
        },
        UIState() {
          return {
            notifications: [],
          };
        },
      });
      return payload;
    });
  }, 0);
  const handleAddNotification = () => {
    addNotification(
      {
        kind: "INFO",
        text: "Lorem",
      },
      env
    );
  };
  const runGC = () => {
    //@ts-ignore
    env.getStore()._scheduleGC();
  };

  return (
    <QueryRenderer<any>
      query={graphql`
        query NotificationsStoryAdding2Query {
          __typename
          uiState {
            ...Notifications_state
          }
        }
      `}
      environment={env}
      variables={{}}
      render={({ props }) => {
        return (
          props && (
            <>
              {props.uiState && <Notifications state={props.uiState} />}
              <br />
              <button onClick={handleAddNotification}>Add Notification</button>
              <br />
              <button onClick={runGC}>Run GC</button>
            </>
          )
        );
      }}
    />
  );
};
