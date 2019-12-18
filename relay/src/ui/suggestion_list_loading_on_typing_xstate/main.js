import React from "react";
import ReactDOM from "react-dom";
import { Machine, interpret } from "xstate";
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

const machine = Machine(machineDef(), {
  services: {
    fetchService: ctx => fetchItems(ctx.inputValue)
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

const service = interpret(machine).onTransition(state => {
  console.log(state.value);
});
service.start();
//window.service = service;

ReactDOM.render(<App service={service} />, document.getElementById("app"));
