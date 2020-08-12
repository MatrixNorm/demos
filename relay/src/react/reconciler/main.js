import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [name, setName] = useState("");
  return <input type="text" value={name} onChange={(e) => setName(e.target.value)} />;
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
