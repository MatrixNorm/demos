import * as React from "react";
import { NextButton, PrevButton } from "../elements/Buttons";

export default { title: "cities_app-demo1/Buttons" };

export const buttons = () => {
  return (
    <div>
      <NextButton />
      <br />
      <PrevButton />
    </div>
  );
};
