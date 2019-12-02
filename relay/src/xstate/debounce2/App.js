import React, { useState, useEffect } from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

function debounceMachineFactory({
  machineId,
  debounceDuration,
  initialInputValue
}) {
  return Machine({
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
          }
        }
      },
      typing: {
        on: {
          TYPING: {
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
  });
}

function TextInputDebounced({ initialValue, onStartTyping, onFinishTyping }) {
  console.log("render: TextInputDebounced");
  const [current, send] = useMachine(
    debounceMachineFactory({
      machineId: "debMachine",
      debounceDuration: 2000,
      initialInputValue: initialValue
    }),
    {
      actions: {
        updateInputValue: assign({ inputValue: (_ctx, evt) => evt.value }),
        onStartTyping: ctx => onStartTyping(ctx.inputValue),
        onFinishTyping: ctx => onFinishTyping(ctx.inputValue)
      }
    }
  );

  // console.log(current);

  // useEffect(() => {
  //   if (current.matches("idle") && current.changed) {
  //     onFinishTyping(current.context.inputValue);
  //   }
  //   if (current.matches("typing") && current.changed) {
  //     onStartTyping(current.context.inputValue);
  //   }
  // }, [current, send]);

  return (
    <input
      type="text"
      onChange={e => send({ type: "TYPING", value: e.target.value })}
      value={current.context.inputValue}
    />
  );
}

export default function App() {
  console.log("render: App");
  const [inputInitialValue, setInputInitialValue] = useState("");

  function onStartTyping(inputValue) {
    console.log("StartTyping", inputValue);
  }

  function onFinishTyping(inputValue) {
    console.log("FinishTyping", inputValue);
  }

  return (
    <>
      <TextInputDebounced
        initialValue={inputInitialValue}
        onStartTyping={onStartTyping}
        onFinishTyping={onFinishTyping}
      />
      <button
        onClick={() => setInputInitialValue(Math.random().toString())}
      >
        Reset input
      </button>
    </>
  );
}
