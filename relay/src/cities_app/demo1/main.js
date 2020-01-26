import React from "react";
import ReactDOM from "react-dom";
import { createRelayEnvironment } from "theapp/env";
import App from "theapp/App";

ReactDOM.render(
  <App environment={createRelayEnvironment()} />,
  document.getElementById("app")
);
