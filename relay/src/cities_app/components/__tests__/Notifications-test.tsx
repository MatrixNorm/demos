import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

export const single = () => {
  const env = createMockEnvironment();
  const TestWrapper = () => (
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
  const container = ReactTestRenderer.create(<TestWrapper />);
  env.mock.resolveMostRecentOperation((operation: any) => {
    let payload = MockPayloadGenerator.generate(operation, {
      UINotification() {
        return {
          id: "notif#1",
          kind: "INFO",
          text:
            "Updated settings saved without any problems. You can go and f. yourself."
        };
      }
    });
    return payload;
  });
};
