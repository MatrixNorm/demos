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

const fetchItems = function(query) {
  return new Promise(resolve => {
    setTimeout(
      () => resolve({ items: [...Array(5).keys()].map(i => `${query}${i}`) }),
      1000
    );
  });
};

const machine = Machine(machineDef({ machineId: "suggestionMachine" }), {
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

export const a1 = () => {
  const service = interpret(machine, {
    clock: new SimulatedClock()
  });
  service.start();
  service.send({ type: "TYPING", inputValue: "abc" });
  return (
    <WithStyle>
      <App current={service.state} send={() => {}} />
    </WithStyle>
  );
};

export const a2 = () => {
  const service = interpret(machine, {
    clock: new SimulatedClock()
  });
  service.start();
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

export const a3 = () => {
  const service = interpret(machine, {
    clock: new SimulatedClock()
  });
  service.start();
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
