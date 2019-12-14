import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { timeoutPromise } from "../../utils";
import { CommandRunnerTakeLatest } from "./command";

const fetchSuggestions = async function({ query }) {
  await timeoutPromise(1000);
  let suggestions = [...Array(5).keys()].map(i => `${query}${i}`);
  return { suggestions };
};

const commandConfig = {
  LOAD_SUGGESTIONS: new CommandRunnerTakeLatest({
    promiseFromCommand: command => fetchSuggestions({ query: command.query }),
    resultToAction: result => ({
      type: "LOAD_OK",
      suggestions: result.suggestions
    }),
    errorToAction: error => ({ type: "LOAD_ERROR", error })
  })
};

ReactDOM.render(
  <App commandConfig={commandConfig} />,
  document.getElementById("app")
);
