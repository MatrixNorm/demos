import React from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

const debounceMachine = Machine({
  id: "debounceMachine",
  context: {
    inputValue: ""
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        TYPING: {
          target: "typing",
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
        2000: "idle"
      }
    }
  }
});

export default function App() {
  const [current, send] = useMachine(debounceMachine, {
    actions: {
      updateInputValue: assign({ inputValue: (_ctx, evt) => evt.value })
    }
  });

  console.log(current);

  return (
    <>
    <div>
      <input
        type="text"
        onChange={e => send({ type: "TYPING", value: e.target.value })}
        value={current.context.inputValue}
      />
    </div>
    {current.matches('typing') && <div>typing...</div>}
    </>
  );
}
