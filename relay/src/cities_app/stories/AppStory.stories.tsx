import * as React from "react";
import StoryRouter from "storybook-react-router";
import { createRelayEnvironment } from "../env";
import App from "../App";

export default {
  title: "cities_app-demo1/App",
  decorators: [
    storyFn => {
      let router = StoryRouter();
      console.log(router);
      return router(storyFn);
    }
  ]
};

export const demo = props => {
  console.log(props);
  const environment = createRelayEnvironment();
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return <App environment={environment} />;
};
