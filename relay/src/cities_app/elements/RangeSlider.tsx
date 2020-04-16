import * as React from "react";
import { useRef, useEffect } from "react";
//@ts-ignore
import RangeSlider from "projroot/web_components/range_slider/RangeSlider";

if (!customElements.get("matrixnorm-range-slider")) {
  customElements.define("matrixnorm-range-slider", RangeSlider);
}

type Props = {
  min: number;
  max: number;
  x1: number;
  x2: number;
};

export default function({ min, max, x1, x2 }: Props) {
  const sliderEl = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sliderEl.current) return;
    const listener = (evt: any) => {
      console.log(evt);
    };
    sliderEl.current.addEventListener("range-update", listener);
    return () => {
      removeEventListener("range-update", listener);
    };
  }, []);
  console.log(x1.toString());
  return (
    <matrixnorm-range-slider
      ref={sliderEl}
      min={min.toString()}
      max={max.toString()}
      x1={x1.toString()}
      x2={x2.toString()}
    ></matrixnorm-range-slider>
  );
}
