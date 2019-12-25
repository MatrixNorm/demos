import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import { Machine, interpret } from "xstate";
import { useService } from "@xstate/react";
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

function Main() {
  const service = useMemo(() => {
    const service = interpret(machine).onTransition(state => {
      console.log(state);
    });
    service.start();
    return service;
  }, []);

  const [current, send] = useService(service);

  return (
    <WithStyle>
      <App current={current} send={send} />
    </WithStyle>
  );
}

ReactDOM.render(<Main />, document.getElementById("app"));
