import React from "react";
import ReactDOM from "react-dom";
import RangeSlider from "./RangeSlider";

console.log(RangeSlider);

customElements.define("matrixnorm-range-slider", RangeSlider);

const App = () => {
  return (
    <>
      <p>xxx</p>
      <matrixnorm-range-slider></matrixnorm-range-slider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
