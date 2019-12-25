import React from "react";
import styled from "styled-components";
import { Machine, interpret } from "xstate";
import { SimulatedClock } from "xstate/lib/SimulatedClock";
import App from "./App";
import { machineDef } from "./machine";

export default { title: "Suggestions" };

const WithStyle = styled.div`
  .suggestions-list {
    padding: 0;
    margin: 0;
  }

  [data-is_pointed="true"] {
    background-color: #7cbd67;
  }
`;

const machine = Machine(machineDef({ machineId: "suggestionMachine" }), {
  services: {
    fetchService: () => new Promise(r => r)
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

function createService() {
  const service = interpret(machine, {
    clock: new SimulatedClock()
  });
  service.start();
  return service;
}

export const idle = () => {
  const service = createService();
  service.send({ type: "TYPING", inputValue: "abc" });
  return (
    <WithStyle>
      <App current={service.state} send={() => {}} />
    </WithStyle>
  );
};

export const loading = () => {
  const service = createService();
  service.send({ type: "TYPING", inputValue: "abc" });
  service.send({
    type: "xstate.after(TYPING_DEBOUNCE_DELAY)#suggestionMachine.typing"
  });
  return (
    <WithStyle>
      <App current={service.state} send={() => {}} />
    </WithStyle>
  );
};

export const invalidQuery = () => {
  const service = createService();
  service.send({ type: "TYPING", inputValue: "123" });
  service.send({
    type: "xstate.after(TYPING_DEBOUNCE_DELAY)#suggestionMachine.typing"
  });
  return (
    <WithStyle>
      <App current={service.state} send={() => {}} />
    </WithStyle>
  );
};

export const fetchOk = () => {
  const service = createService();
  service.send({ type: "TYPING", inputValue: "abc" });
  service.send({
    type: "xstate.after(TYPING_DEBOUNCE_DELAY)#suggestionMachine.typing"
  });
  service.send({
    type: "done.invoke.fetchService",
    data: { items: ["aaa", "bbb", "ccc", "ddd", "eee"] }
  });
  return (
    <WithStyle>
      <App current={service.state} send={() => {}} />
    </WithStyle>
  );
};

export const fetchError = () => {
  const service = createService();
  service.send({ type: "TYPING", inputValue: "abc" });
  service.send({
    type: "xstate.after(TYPING_DEBOUNCE_DELAY)#suggestionMachine.typing"
  });
  service.send({
    type: "error.platform.fetchService",
    data: { errorMsg: "Network Error" }
  });
  return (
    <WithStyle>
      <App current={service.state} send={() => {}} />
    </WithStyle>
  );
};

export const selectedItem = () => {
  const service = createService();
  service.send({ type: "TYPING", inputValue: "abc" });
  service.send({
    type: "xstate.after(TYPING_DEBOUNCE_DELAY)#suggestionMachine.typing"
  });
  service.send({
    type: "done.invoke.fetchService",
    data: { items: ["aaa", "bbb", "ccc", "ddd", "eee"] }
  });
  service.send({ type: "MOUSE_ENTERED_ITEM", itemIndex: 3 });
  return (
    <WithStyle>
      <App current={service.state} send={() => {}} />
    </WithStyle>
  );
};
