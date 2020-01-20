import React from "react";
import { City } from "../components/City";

export default { title: "cities app / demo1" };

export const idle = () => {
  return <City name="Tokyo" country="Japan" population={35676000} />;
};
