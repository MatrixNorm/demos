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
  step: number;
  x1: number;
  x2: number;
  onChange: any;
};

export default function({ min, max, step, x1, x2, onChange }: Props) {
  const sliderEl = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sliderEl.current) return;
    const listener = (evt: any) => {
      onChange({
        lower: Number(evt.detail.lower),
        upper: Number(evt.detail.upper),
      });
    };
    sliderEl.current.addEventListener("range-update", listener);
    return () => {
      removeEventListener("range-update", listener);
    };
  }, []);
  // https://github.com/microsoft/TypeScript/issues/4648
  return React.createElement("matrixnorm-range-slider", {
    ref: sliderEl,
    min: min.toString(),
    max: max.toString(),
    step: step.toString(),
    x1: x1.toString(),
    x2: x2.toString(),
  });
}
