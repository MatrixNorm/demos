import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import { SearchParametersPure } from "../components/SearchParameters";

export default { title: "cities_app-demo1/SearchParams" };

export const aaa1 = () => {
  const val = {
    countryNameContains: "bra",
    populationGte: 1000,
    populationLte: 30000
  };
  const on = {
    countryNameContains: console.log,
    populationGte: console.log,
    populationLte: console.log
  };
  return <SearchParametersPure val={val} on={on} />;
};
