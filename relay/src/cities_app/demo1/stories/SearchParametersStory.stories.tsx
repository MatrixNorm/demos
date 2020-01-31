import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createTestingEnv } from "../env";
import { SearchParametersPresentational } from "../components/SearchParametersPresentational";
import SearchParameters from "../components/SearchParameters";

export default { title: "cities_app-demo1/SearchParameters" };

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

export const bbb2 = () => {
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => {
        return {
          populationLowerBound: 2,
          populationUpperBound: 8
        };
      }
    }
  });
  return (
    <QueryRenderer
      query={graphql`
        query SearchParametersStoryQuery {
          citiesMetadata {
            ...SearchParameters_metadata
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        return (
          <SearchParameters
            metadata={props.citiesMetadata}
            initialSearchParams={{
              countryNameContains: "q",
              populationGte: null,
              populationLte: null
            }}
            environment={environment}
            refetch={() => {}}
          />
        );
      }}
    />
  );
};
