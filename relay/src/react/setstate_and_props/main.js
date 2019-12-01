import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  console.log("App");
  const [inputInitialValue, setInputInitialValue] = useState("");
  return (
    <div>
      <button
        onClick={() => setInputInitialValue(new Date().getMilliseconds())}
      >
        Reset input
      </button>
      <TextInput initialValue={inputInitialValue} />
    </div>
  );
}

function TextInput({ initialValue }) {
  const [value, setValue] = useState(initialValue);
  console.log("TextInput", initialValue, value);

  useEffect(() => {
    console.log("useEffect");
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
