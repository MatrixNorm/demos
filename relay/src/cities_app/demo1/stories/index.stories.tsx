import * as React from "react";
import { CitySummary__ } from "../components/CitySummary";

export default { title: "cities_app/demo1" };

/**
 * https://github.com/facebook/relay/issues/2394
 *   
 */

const mockRefType: any = null;


export const aaa = () => {
  let city = {
    id: "1",
    name: "Madrid",
    country: "Spain",
    population: 3400500,
    " $refType": mockRefType
  };
  return <CitySummary__ city={city} />;
};
