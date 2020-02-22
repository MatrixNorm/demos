import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { Notifications_notification } from "__relay__/Notifications_notification.graphql";
import { Notifications_state } from "__relay__/Notifications_state.graphql";

const Notification_ = ({
  notification,
  className
}: {
  notification: Notifications_notification;
  className: string;
}) => {
  const { id, kind, text } = notification;
  return (
    <div className={className}>
      <span className="button-close" onClick={() => remNotification(id)}>
        x
      </span>
      <div className="text">{text}</div>
    </div>
  );
};

export const Notification = createFragmentContainer(
  styled(Notification_)`
    display: inline-flex;
    width: 10em;
    border: 1px solid black;
    padding: 1.4em 1em 1.4em 1em;
    position: relative;
    .button-close {
      position: absolute;
      top: 0;
      right: 0.2em;
      font-size: 1.4em;
      &:hover {
        color: blue;
      }
    }
  `,
  {
    notification: graphql`
      fragment Notifications_notification on UINotification {
        id
        kind
        text
      }
    `
  }
);

const Notifications_ = ({
  state,
  className
}: {
  state: Notifications_state;
  className: string;
}) => {
  return (
    <ol className={className}>
      {state.notifications &&
        state.notifications.map(notification => (
          <li key={notification.id} className="list-item">
            <Notification notification={notification} />
          </li>
        ))}
    </ol>
  );
};

export const Notifications = createFragmentContainer(
  styled(Notifications_)`
    list-style: none;
    padding: 0;
    margin: 0;
    display: inline-block;
    .list-item {
      margin-bottom: 1em;
    }
  `,
  {
    state: graphql`
      fragment Notifications_state on UIState {
        notifications {
          id
          ...Notifications_notification
        }
      }
    `
  }
);

export const remNotification = (notificationId: string) => {
  console.log(`close notification with id=${notificationId}`);
};

type NotificationType = Omit<Notifications_notification, " $refType">;

export const addNotification = (notification: NotificationType) => {};
