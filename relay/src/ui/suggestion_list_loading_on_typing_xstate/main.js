import React, { useMemo, useRef } from "react";
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

function Main({ inputValue, onUpdate }) {
  const currentValue = useRef(inputValue);

  const service = useMemo(() => {
    const machine = Machine(
      machineDef({
        machineId: "suggestionMachine",
        initialInputValue: inputValue
      }),
      {
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
      }
    );
    const service = interpret(machine).onTransition(state => {
      if (state.changed && state.value === "idle") {
        let { inputValue } = state.context;
        if (inputValue !== currentValue.current) {
          currentValue.current = inputValue;
          onUpdate(inputValue);
        }
      }
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

ReactDOM.render(
  <Main inputValue="foo" onUpdate={console.log} />,
  document.getElementById("app")
);
