import * as React from "react";
import { graphql, createFragmentContainer, RelayProp } from "react-relay";
import {
  commitLocalUpdate,
  IEnvironment,
  getRequest,
  createOperationDescriptor,
  ROOT_ID,
} from "relay-runtime";
import styled from "styled-components";
import { uuidGen } from "../helpers/uuid";
import { CloseCrossIcon } from "../elements/Icons";
import { Notifications_notification } from "__relay__/Notifications_notification.graphql";
import { Notifications_state } from "__relay__/Notifications_state.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

const NotificationStyled = styled.div`
  display: inline-flex;
  width: 10em;
  border: 1px solid black;
  padding: 1.4em 1em 1.4em 1em;
  position: relative;
  .button-close {
    position: absolute;
    top: 2px;
    right: 0;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Notification_ = ({
  notification,
  relay,
}: {
  notification: Notifications_notification;
  relay: RelayProp;
}) => {
  const { id, kind, text } = notification;
  return (
    <NotificationStyled>
      <CloseCrossIcon
        className="button-close"
        onClick={() => remNotification(id, relay.environment)}
      />
      <div className="text">{text}</div>
    </NotificationStyled>
  );
};

export const Notification = createFragmentContainer(Notification_, {
  notification: graphql`
    fragment Notifications_notification on UINotification {
      id
      kind
      text
    }
  `,
});

const NotificationsStyled = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  .list-item {
    margin-bottom: 1em;
  }
`;

const Notifications_ = ({ state }: { state: Notifications_state }) => {
  return (
    <NotificationsStyled>
      {state.notifications &&
        state.notifications.map((notification) => (
          <li key={notification.id} className="list-item">
            <Notification notification={notification} />
          </li>
        ))}
    </NotificationsStyled>
  );
};

export const Notifications = createFragmentContainer(Notifications_, {
  state: graphql`
    fragment Notifications_state on UIState {
      notifications {
        id
        ...Notifications_notification
      }
    }
  `,
});

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
    const newNotificationRecord = store.create(
      notificationId,
      "UINotification"
    );
    newNotificationRecord.setValue(notificationId, "id");
    newNotificationRecord.setValue(notification.kind, "kind");
    newNotificationRecord.setValue(notification.text, "text");

    const uiStateRecord = root.getOrCreateLinkedRecord("uiState", "UIState");
    const notificationRecords =
      uiStateRecord.getLinkedRecords("notifications") || [];
    uiStateRecord.setLinkedRecords(
      [newNotificationRecord, ...notificationRecords],
      "notifications"
    );
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

export const remNotification = (
  notificationId: string,
  environment: IEnvironment
) => {
  commitLocalUpdate(environment, (store) => {
    const root = store.get(ROOT_ID);
    if (!root) return;
    store.delete(notificationId);
    const uiStateRecord = root.getLinkedRecord("uiState");
    if (!uiStateRecord) return;
    const notificationRecords = uiStateRecord.getLinkedRecords("notifications");
    if (!notificationRecords) return;
    const notificationRecords2 = notificationRecords.filter(
      (rp) => rp !== null
    );
    uiStateRecord.setLinkedRecords(notificationRecords2, "notifications");
  });
};
