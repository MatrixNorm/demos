import * as React from "react";
import { loadingForeverEnvironment, createFakeServerEnvironment } from "../env";
import SettingsPage from "../pages/SettingsPage";
import RequestViewer from "./RequestViewer";
import { createResolvers } from "./UserSettings.stories";

export default { title: "cities_app-demo1/SettingsPage" };

export const full = () => {
  const { server, environment } = createFakeServerEnvironment(createResolvers());
  return (
    <>
      <SettingsPage environment={environment} />
      <RequestViewer server={server} />
    </>
  );
};

export const loading = () => {
  const environment = loadingForeverEnvironment();
  return <SettingsPage environment={environment} />;
};
