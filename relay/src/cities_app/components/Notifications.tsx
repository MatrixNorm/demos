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
  const handleClose = () => {
    console.log(`close notification with id=${id}`);
  };
  return (
    <div className={className}>
      <span className="button-close" onClick={handleClose}>
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

const Notifications_ = ({ state }: { state: Notifications_state }) => {
  return (
    <ol>
      {state.notifications &&
        state.notifications.map(notification => (
          <li key={notification.id}>
            <Notification notification={notification} />
          </li>
        ))}
    </ol>
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
