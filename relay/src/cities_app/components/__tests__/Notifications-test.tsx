/* globals describe test expect beforeEach */
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import {
  createOperationDescriptor,
  getRequest,
  RecordSource,
  Store,
  IEnvironment,
  OperationDescriptor
} from "relay-runtime";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import * as TestRenderer from "react-test-renderer";
import {
  addNotification,
  remNotification,
  Notification
} from "../Notifications";

describe("add, retain, remove", () => {
  let env: IEnvironment;
  let request;
  let operation: OperationDescriptor;
  let notificationId: string;

  beforeEach(() => {
    const initialData = {
      "client:root": {
        __id: "client:root",
        __typename: "__Root"
      }
    };
    const store = new Store(new RecordSource(initialData));
    //@ts-ignore
    env = createMockEnvironment({ store });
    notificationId = addNotification({ kind: "INFO", text: "lalala" }, env);
    const query = graphql`
      query NotificationsTestAddRetainRemoveQuery {
        __typename
        uiState {
          notifications {
            id
            kind
            text
          }
        }
      }
    `;
    request = getRequest(query);
    operation = createOperationDescriptor(request, {});
  });

  test("add", () => {
    let response = env.lookup(operation.fragment);
    //@ts-ignore
    const notifications = response.data.uiState.notifications;
    expect(notifications.length).toEqual(1);
    expect(notifications[0].kind).toEqual("INFO");
    expect(notifications[0].text).toEqual("lalala");
  });

  test("retain", () => {
    //@ts-ignore
    env.getStore().__gc();
    let response = env.lookup(operation.fragment);
    //@ts-ignore
    const notifications = response.data.uiState.notifications;
    expect(notifications.length).toEqual(1);
    expect(notifications[0].kind).toEqual("INFO");
    expect(notifications[0].text).toEqual("lalala");
  });

  test("remove", () => {
    //@ts-ignore
    //console.log(JSON.stringify(env.getStore().getSource()._records, null, 2));
    remNotification(notificationId, env);
    let response = env.lookup(operation.fragment);
    //@ts-ignore
    const notifications = response.data.uiState.notifications;
    expect(notifications.length).toEqual(0);
  });
});

describe("render single", () => {
  test("1", () => {
    const env = createMockEnvironment();
    const container = TestRenderer.create(
      <QueryRenderer<any>
        query={graphql`
          query NotificationsTestRenderSingleQuery @relay_test_operation {
            notification: node(id: "notification#1") {
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
    env.mock.resolveMostRecentOperation(operation => {
      let payload = MockPayloadGenerator.generate(operation, {
        UINotification() {
          return {
            id: "notification#1",
            kind: "INFO",
            text: "lorem ipsum"
          };
        }
      });
      return payload;
    });
    const textEl = container.root.findByProps({'className': 'text'});
    expect(textEl.children[0]).toEqual("lorem ipsum");
  });
});
