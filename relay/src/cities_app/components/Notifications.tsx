import * as React from "react";
import { graphql, createFragmentContainer, RelayProp } from "react-relay";
import styled from "styled-components";
import * as NC from "../mutations/NotificationsController";
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
        onClick={() => NC.remNotification(id, relay.environment)}
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
