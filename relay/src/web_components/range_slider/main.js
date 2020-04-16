import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import RangeSlider from "./RangeSlider";

customElements.define("matrixnorm-range-slider", RangeSlider);

const App = () => {
  const sliderEl = useRef(null);

  useEffect(() => {
    sliderEl.current.addEventListener("range-update", (evt) => {
      console.log("range-update: ", evt);
    });
    return () => {
      removeEventListener("range-update");
    };
  }, []);

  return (
    <matrixnorm-range-slider
      ref={sliderEl}
      min="-1"
      max="1"
      x1="-0.3"
      x2="0.7"
      step="0.01"
    ></matrixnorm-range-slider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
