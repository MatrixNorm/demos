import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import RangeSlider from "./RangeSlider";

customElements.define("matrixnorm-range-slider", RangeSlider);

const App = () => {
  const sliderEl = useRef(null);

  useEffect(() => {
    sliderEl.current.addEventListener("range-update", evt => {
      console.log(evt);
    });
    return () => {
      removeEventListener("range-update");
    };
  }, []);

  return (
    <matrixnorm-range-slider
      ref={sliderEl}
      min="50"
      max="500"
    ></matrixnorm-range-slider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
