import React from "react";
import ReactDOM from "react-dom";
import { Machine } from "xstate";
import App from "./App";
import { createSuggestionMachine } from "./machine";

const fetchItemsPromise = function(query) {
  return new Promise(resolve => {
    setTimeout(
      () => resolve({ items: [...Array(5).keys()].map(i => `${query}${i}`) }),
      1000
    );
  });
};

const machine = Machine(
  createSuggestionMachine({
    fetchItems: fetchItemsPromise,
    isQueryValid: q => q && q.trim().length > 0
  })
);

ReactDOM.render(<App machine={machine} />, document.getElementById("app"));
