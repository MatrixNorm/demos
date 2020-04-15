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
};

export default function({ min, max }: Props) {
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

  return (
    <matrixnorm-range-slider
      ref={sliderEl}
      min={min}
      max={max}
    ></matrixnorm-range-slider>
  );
}
