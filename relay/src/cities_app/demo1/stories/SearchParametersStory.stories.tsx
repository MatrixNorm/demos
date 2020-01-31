import * as React from "react";
import { SearchParametersPresentational } from "../components/SearchParametersPresentational";

export default { title: "cities_app-demo1/SearchParams" };

export const aaa1 = () => {
  const fieldValues = {
    countryNameContains: "bra",
    populationGte: 1000,
    populationLte: 30000
  };
  const onFieldChange = (fieldName: string, fieldValue: any) => {
    console.log(fieldName, fieldValue);
  };

  return (
    <SearchParametersPresentational
      fieldValues={fieldValues}
      onFieldChange={onFieldChange}
      onButtonClick={() => {}}
    />
  );
};
