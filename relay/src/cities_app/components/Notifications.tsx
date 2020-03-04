import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import {
  commitLocalUpdate,
  IEnvironment,
  getRequest,
  createOperationDescriptor
} from "relay-runtime";
import styled from "styled-components";
import { CloseCrossIcon } from "../elements/Icons";
import { Notifications_notification } from "__relay__/Notifications_notification.graphql";
import { Notifications_state } from "__relay__/Notifications_state.graphql";

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
  notification
}: {
  notification: Notifications_notification;
}) => {
  const { id, kind, text } = notification;
  return (
    <NotificationStyled>
      <CloseCrossIcon
        className="button-close"
        onClick={() => remNotification(id)}
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
  `
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
        state.notifications.map(notification => (
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
  `
});

export const remNotification = (
  notificationId: string,
  environment: IEnvironment
) => {
  commitLocalUpdate(environment, store => {
    store.delete(notificationId);
  });
};

type NotificationDataType = Omit<
  Notifications_notification,
  " $refType" | "id"
>;

function uuidGen() {
  let date = new Date().toISOString();
  let random = Math.random()
    .toString()
    .slice(2);
  return `client:UINotification-${date}-${random}`;
}

export const addNotification = (
  notification: NotificationDataType,
  environment: IEnvironment
): string => {
  const notificationId = uuidGen();
  commitLocalUpdate(environment, store => {
    const root = store.get("client:root");
    if (!root) return;
    const newNotificationRecord = store.create(
      notificationId,
      "UINotification"
    );
    newNotificationRecord.setValue(notificationId, "id");
    newNotificationRecord.setValue(notification.kind, "kind");
    newNotificationRecord.setValue(notification.text, "text");

    const uiStateRecord = root.getOrCreateLinkedRecord("uiState", "UIState");
    const notificationRecords = uiStateRecord.getLinkedRecords("notifications");
    if (notificationRecords) {
      uiStateRecord.setLinkedRecords(
        [newNotificationRecord, ...notificationRecords],
        "notifications"
      );
    } else {
      uiStateRecord.setLinkedRecords([newNotificationRecord], "notifications");
    }

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
