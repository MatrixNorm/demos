import React from "react";
import ReactDOM from "react-dom";
import { Machine } from "xstate";
import App from "./App";
import { machineDef } from "./machine";

const fetchItems = function(query) {
  return new Promise(resolve => {
    setTimeout(
      () => resolve({ items: [...Array(5).keys()].map(i => `${query}${i}`) }),
      1000
    );
  });
};

const machine = Machine(Machine(machineDef), {
  services: {
    fetchService: fetchItems
  },
  guards: {
    isQueryValid: ctx => {
      let q = ctx.inputValue;
      return q && q.trim().length > 0;
    }
  },
  delays: {
    TYPING_DEBOUNCE_DELAY: 500
  }
});

ReactDOM.render(<App machine={machine} />, document.getElementById("app"));
