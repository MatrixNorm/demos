import * as React from "react";
import { TextInput, NumberInput } from "../elements/Inputs";

export default { title: "cities_app-demo1/Inputs" };

export const textInput = () => {
  return <TextInput />;
};

export const numberInput = () => {
  return <NumberInput step={"1000"} />;
};
