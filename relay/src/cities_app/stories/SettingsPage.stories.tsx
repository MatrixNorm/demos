import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { loadingForeverEnvironment, createRelayEnvironment } from "../env";
import SettingsPage from "../pages/SettingsPage";

export default { title: "cities_app-demo1/SettingsPage" };

export const full = () => {
  const environment = createRelayEnvironment();
  console.log(SettingsPage);
  return <SettingsPage environment={environment} />;
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  console.log(SettingsPage);
  return <SettingsPage environment={environment} />;
};
