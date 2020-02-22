import * as React from "react";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { graphql, QueryRenderer } from "react-relay";
import { Notification, Notifications } from "../components/Notifications";

export default { title: "cities_app-demo1/Notifications" };

// export const single = () => {
//   const env = createMockEnvironment();
//   setTimeout(() => {
//     env.mock.resolveMostRecentOperation((operation: any) => {
//       let payload = MockPayloadGenerator.generate(operation, {
//         UINotification() {
//           return {
//             id: "notif#1",
//             kind: "INFO",
//             text:
//               "Updated settings saved without any problems. You can go and f. yourself."
//           };
//         }
//       });
//       console.log({ operation, payload });
//       return payload;
//     });
//   }, 0);
//   return (
//     <QueryRenderer<any>
//       query={graphql`
//         query NotificationsStoryQuery @relay_test_operation {
//           notification: node(id: "notification_id") {
//             ...Notifications_notification
//           }
//         }
//       `}
//       environment={env}
//       variables={{}}
//       render={({ props }) => {
//         return (
//           props &&
//           props.notification && (
//             <Notification notification={props.notification} />
//           )
//         );
//       }}
//     />
//   );
// };

export const multiple = () => {
  const env = createMockEnvironment();
  setTimeout(() => {
    env.mock.resolveMostRecentOperation((operation: any) => {
      let payload = MockPayloadGenerator.generate(operation, {
        ID(_, generateId) {
          return `uuid-${generateId()}`;
        },
        UIState() {
          console.log(11111)
          return {
            notifications: [
              {
                kind: "INFO",
                text: "Lorem ipsum"
              },
              {
                kind: "INFO",
                text: "Lorem ipsum"
              }
            ]
          };
        },
        // UINotification(x) {
        //   console.log(x);
        //   return {
        //     kind: "INFO",
        //     text: "Lorem ipsum"
        //   };
        // }
      });
      console.log({ operation, payload });
      return payload;
    });
  }, 0);
  return (
    <QueryRenderer<any>
      query={graphql`
        query NotificationsStory2Query @relay_test_operation {
          uiState {
            notifications {
              ...Notifications_notification
            }
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
