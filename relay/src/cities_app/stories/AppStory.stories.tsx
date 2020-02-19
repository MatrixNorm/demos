import * as React from "react";
import StoryRouter from "storybook-react-router";
import { createRelayEnvironment } from "../env";
import App from "../App";

export default { title: "cities_app-demo1/App" };

export const demo = () => {
  const environment = createRelayEnvironment();
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return <App environment={environment} />;
};
