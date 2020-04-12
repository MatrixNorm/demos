import React from "react";
import ReactDOM from "react-dom";
import RangeSlider from "./RangeSlider";

customElements.define("matrixnorm-range-slider", RangeSlider);

const App = () => {
  return <matrixnorm-range-slider min="50" max="500"></matrixnorm-range-slider>;
};

ReactDOM.render(<App />, document.getElementById("app"));
