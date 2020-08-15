import React from "react";
import ReactDOM from "react-dom";
import Fig1 from "./fig1";
import Fig2 from "./fig2";

function App() {
  return (
    <>
      <Fig1 />
      <br />
      <Fig2 />
    </>
  );
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
