import React, { useMemo, useEffect } from "react";
import { Machine, assign, interpret } from "xstate";
import { useService } from "@xstate/react";

function debounceMachineDefinition({
  machineId,
  debounceDuration,
  initialInputValue
}) {
  return {
    id: machineId,
    context: {
      inputValue: initialInputValue
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          TYPING: {
            target: "typing",
            actions: ["updateInputValue", "onStartTyping"]
          },
          RESET: {
            actions: "updateInputValue"
          }
        }
      },
      typing: {
        on: {
          TYPING: {
            target: "typing",
            actions: "updateInputValue"
          }
        },
        after: {
          [debounceDuration]: {
            target: "idle",
            actions: "onFinishTyping"
          }
        }
      }
    }
  };
}

function TextInputDebounced({ service }) {
  console.log("render: TextInputDebounced");
  const [current, send] = useService(service);
  return (
    <div>
      <input
        type="text"
        onChange={e => send({ type: "TYPING", value: e.target.value })}
        value={current.context.inputValue}
      />
      {current.matches("typing") && <i>typing...</i>}
    </div>
  );
}

export default function App() {
  console.log("render: App");

  const service = useMemo(() => {
    const defs = debounceMachineDefinition({
      machineId: "debounceMachine",
      debounceDuration: 2000,
      initialInputValue: ""
    });
    const opts = {
      actions: {
        updateInputValue: assign({ inputValue: (_ctx, evt) => evt.value }),
        onStartTyping: ctx => onStartTyping(ctx.inputValue),
        onFinishTyping: ctx => onFinishTyping(ctx.inputValue)
      }
    };
    const machine = Machine(defs, opts);
    const service = interpret(machine);
    service.start();
    return service;
  });
  console.log(service);
  const onStartTyping = inputValue => {
    console.log("StartTyping", inputValue);
  };

  const onFinishTyping = inputValue => {
    console.log("FinishTyping", inputValue);
  };

  return (
    <div>
      <TextInputDebounced service={service} />
      <button onClick={() => service.send({ type: "RESET", value: "" })}>
        Reset input
      </button>
    </div>
  );
}
