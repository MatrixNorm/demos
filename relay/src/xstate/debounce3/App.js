import React, { useMemo, useState } from "react";
import * as deb from "./debounce";

export default function App() {
  console.log("render: App");
  const [userTyping, setUserTyping] = useState(false);

  const [inputEl, resetInput] = useMemo(() => {
    const onStartTyping = inputValue => {
      console.log("StartTyping", inputValue);
      setUserTyping(true);
    };
    const onFinishTyping = inputValue => {
      console.log("FinishTyping", inputValue);
      setUserTyping(false);
    };
    return deb.createElement({
      debounceDuration: 2000,
      initialInputValue: "",
      onStartTyping,
      onFinishTyping
    });
  }, []);

  return (
    <div>
      {inputEl}
      <button onClick={() => resetInput("")} disabled={userTyping}>
        Reset input
      </button>
    </div>
  );
}
