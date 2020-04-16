import * as React from "react";
import { TextInput, NumberInput } from "../elements/Inputs";
import RangeSlider from "../elements/RangeSlider";

export default { title: "cities_app-demo1/Inputs" };

export const textInput = () => {
  return <TextInput />;
};

export const numberInput = () => {
  return <NumberInput step={"1000"} />;
};

export const rangeSlider = () => {
  return <RangeSlider min={-1} max={+1} x1={-0.2} x2={0.5} />;
};
