import { graphql } from "react-relay";
import {
  commitLocalUpdate,
  IEnvironment,
  getRequest,
  createOperationDescriptor,
  ROOT_ID,
} from "relay-runtime";
import { uuidGen } from "../helpers/uuid";
import { Notifications_notification } from "__relay__/Notifications_notification.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

type NotificationDataType = Omit<NukeFragRef<Notifications_notification>, "id">;

const uuid = uuidGen("client:UINotification");

export const addNotification = (
  notification: NotificationDataType,
  environment: IEnvironment
): string => {
  const notificationId = uuid();
  commitLocalUpdate(environment, (store) => {
    const root = store.get(ROOT_ID);
    if (!root) return;
    const newRecord = store.create(notificationId, "UINotification");
    newRecord.setValue(notificationId, "id");
    newRecord.setValue(notification.kind, "kind");
    newRecord.setValue(notification.text, "text");

    const uiStateRecord = root.getOrCreateLinkedRecord("uiState", "UIState");
    const notificationRecords = uiStateRecord.getLinkedRecords("notifications") || [];
    uiStateRecord.setLinkedRecords([newRecord, ...notificationRecords], "notifications");
    // if (notificationRecords) {
    //   uiStateRecord.setLinkedRecords(
    //     [newNotificationRecord, ...notificationRecords],
    //     "notifications"
    //   );
    // } else {
    //   uiStateRecord.setLinkedRecords([newNotificationRecord], "notifications");
    // }

    const query = graphql`
      query NotificationsUiRetainQuery {
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
    const request = getRequest(query);
    const operationDescriptor = createOperationDescriptor(request, {});
    environment.retain(operationDescriptor);
  });
  return notificationId;
};

export const remNotification = (notificationId: string, environment: IEnvironment) => {
  commitLocalUpdate(environment, (store) => {
    const root = store.get(ROOT_ID);
    if (!root) return;
    store.delete(notificationId);
    const uiStateRecord = root.getLinkedRecord("uiState");
    if (!uiStateRecord) return;
    const notificationRecords = uiStateRecord.getLinkedRecords("notifications");
    if (!notificationRecords) return;
    const notificationRecords2 = notificationRecords.filter((rp) => rp !== null);
    uiStateRecord.setLinkedRecords(notificationRecords2, "notifications");
  });
};
