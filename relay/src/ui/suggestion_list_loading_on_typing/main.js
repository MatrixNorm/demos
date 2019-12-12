import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { timeoutPromise } from "../../utils";

const fetchSuggestions = async function({ query }) {
  await timeoutPromise(1000);
  let suggestions = [...Array(5).keys()].map(i => `${query}${i}`);
  return { suggestions };
};

ReactDOM.render(
  <App fetchSuggestions={fetchSuggestions} />,
  document.getElementById("app")
);
