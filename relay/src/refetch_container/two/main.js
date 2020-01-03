import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import makeEnv from "../env";

ReactDOM.render(<App env={makeEnv()} />, document.getElementById("app"));
