import React, { useMemo } from "react";
import { Machine, assign, interpret } from "xstate";
import { useService } from "@xstate/react";
import * as deb from './debounce'

export default function App() {
  console.log("render: App");

  const [service, resetInput] = useMemo(() => {
    const onStartTyping = inputValue => {
      console.log("StartTyping", inputValue);
    };
    const onFinishTyping = inputValue => {
      console.log("FinishTyping", inputValue);
    };
    return deb.makeService({
      debounceDuration: 2000,
      initialInputValue: "",
      onStartTyping,
      onFinishTyping
    });
  });

  return (
    <div>
      <deb.TextInputDebounced service={service} />
      <button onClick={() => resetInput("")}>Reset input</button>
    </div>
  );
}
