import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { Notifications_notification } from "__relay__/Notifications_notification.graphql";
import { Notifications_state } from "__relay__/Notifications_state.graphql";

export const Notification_ = ({
  notification
}: {
  notification: Notifications_notification;
}) => {
  const { id, kind, text } = notification;
  return <div>{text}</div>;
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

export const Notifications_ = ({ state }: { state: Notifications_state }) => {
  return (
    state.notifications &&
    state.notifications.map(notification => (
      <Notification notification={notification} />
    ))
  );
};

export const Notifications = createFragmentContainer(Notifications_, {
  state: graphql`
    fragment Notifications_state on UIState {
      notifications {
        ...Notifications_notification
      }
    }
  `
});
