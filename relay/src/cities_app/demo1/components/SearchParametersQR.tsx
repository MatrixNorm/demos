import * as React from "react";
import { QueryRenderer, LocalQueryRenderer, graphql } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { SearchParameters } from "./SearchParameters";

export const SearchParametersQR = ({
  environment
}: {
  environment: IEnvironment;
}) => {
  return (
    <QueryRenderer
      query={graphql`
        query SearchParametersQR(
          citiesMetadata {
            populationLowerBound
            populationUpperBound
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>ERROR</div>;
        }
        if (props) {
          return (
            props.citiesMetadata && (
              <SearchParametersQRLocal
                metadata={props.citiesMetadata}
                environment={environment}
              />
            )
          );
        }
        return <div>loading...</div>;
      }}
    />
  );
};

export const SearchParametersQRLocal = ({ metadata, environment }) => {
  return (
    <LocalQueryRenderer
      query={graphql`
        query SearchParametersQRLocalQuery(
          __typename
          uiState {
            citySearchParams {
              countryNameContains
              populationGte
              populationLte
            }
          }
        }
      `}
      environment={environment}
      variables={{}}
      render={({ props }) => {
        if (props) {
          return (
            <SearchParameters
              metadata={metadata}
              initialSearchParams={props.uiState.citySearchParams}
              environment={environment}
              render={}
            />
          );
        }
        return null;
      }}
    />
  );
};
