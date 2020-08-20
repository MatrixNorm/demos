import React, { useState } from "react";
import ReactDOM from "react-dom";

function Foo() {
  throw new Error("uck");
}

function Bar() {
  try {
    return <Foo />;
  } catch (err) {
    // never gets here
    return "ERROR";
  }
}

ReactDOM.render(<Bar />, document.getElementById("app"));
