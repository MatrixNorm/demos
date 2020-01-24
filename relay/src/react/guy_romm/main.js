import React from "react";
import ReactDOM from "react-dom";
import { getRandomColorStyleValue } from "./utils.js";
import { MainView } from "./a-4";

ReactDOM.render(
  <MainView initialBorderColor={getRandomColorStyleValue()} />,
  document.getElementById("app")
);
