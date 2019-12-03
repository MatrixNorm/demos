import React, { useMemo } from "react";
import * as deb from "./debounce";

export default function App() {
  console.log("render: App");

  const [inputEl, resetInput] = useMemo(() => {
    const onStartTyping = inputValue => {
      console.log("StartTyping", inputValue);
    };
    const onFinishTyping = inputValue => {
      console.log("FinishTyping", inputValue);
    };
    return deb.createElement({
      debounceDuration: 2000,
      initialInputValue: "",
      onStartTyping,
      onFinishTyping
    });
  });

  return (
    <div>
      {inputEl}
      <button onClick={() => resetInput("")}>Reset input</button>
    </div>
  );
}
