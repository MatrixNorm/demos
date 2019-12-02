import React, { useState, useEffect, useCallback } from "react";
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
          },
          RESET: {
            actions: "updateInputValue"
          }
        }
      },
      typing: {
        on: {
          TYPING: {
            target: 'typing',
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
  console.log("render: TextInputDebounced", initialValue);
  const [current, send] = useMachine(
    debounceMachineFactory({
      machineId: "debMachine",
      debounceDuration: 2000,
      initialInputValue: initialValue
    }).withConfig({
      actions: {
        updateInputValue: assign({ inputValue: (_ctx, evt) => evt.value }),
        onStartTyping: ctx => onStartTyping(ctx.inputValue),
        onFinishTyping: ctx => onFinishTyping(ctx.inputValue)
      }
    })
  );

  useEffect(() => {
    console.log("useEffect");
    send({ type: "RESET", value: initialValue });
  }, [initialValue]);

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

  const onStartTyping = useCallback(inputValue => {
    console.log("StartTyping", inputValue);
  });

  const onFinishTyping = useCallback(inputValue => {
    console.log("FinishTyping", inputValue);
  });

  return (
    <>
      <TextInputDebounced
        initialValue={inputInitialValue}
        onStartTyping={onStartTyping}
        onFinishTyping={onFinishTyping}
      />
      <button onClick={() => setInputInitialValue("")}>Reset input</button>
    </>
  );
}
