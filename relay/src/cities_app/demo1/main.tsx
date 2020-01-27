import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRelayEnvironment } from "./env";
import App from "./App";

ReactDOM.render(
  <App environment={createRelayEnvironment()} />,
  document.getElementById("app")
);
