import React from "react";
import ReactDOM from "react-dom";
import { Machine, interpret } from "xstate";
import styled from "styled-components";
import App from "./App";
import { machineDef } from "./machine";

const WithStyle = styled.div`
  .suggestions-list {
    padding: 0;
    margin: 0;
  }

  [data-is_pointed="true"] {
    background-color: #7cbd67;
  }
`;

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
      return q.trim().length > 0 && /^[a-zA-Z]+$/.test(q);
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

ReactDOM.render(
  <WithStyle>
    <App service={service} />
  </WithStyle>,
  document.getElementById("app")
);
