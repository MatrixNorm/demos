import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import { SearchParametersPresentational } from "./SearchParametersPresentational";
import { toQueryURL, stripEmptyProps } from "../helpers/object";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParameters_editDelta } from "__relay__/SearchParameters_editDelta.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersType = NukeFragRef<SearchParameters_searchParams>;
export type SearchParametersNonNullType = NukeNulls<SearchParametersType>;
export type SearchMetadataType = NukeFragRef<SearchParameters_searchMetadata>;

export type RenderCallbackArgsType = {
  environment: IEnvironment;
  searchParams: SearchParametersNonNullType;
  searchMetadata: SearchMetadataType;
  url: string | null;
};

type Props = {
  searchMetadata: SearchParameters_searchMetadata;
  searchParams: SearchParameters_searchParams | null;
  editDelta: SearchParameters_editDelta | null;
  environment: IEnvironment;
};

const SearchParametersFC = createFragmentContainer(
  (props: Props) => {
    const searchParams = stripEmptyProps(props.searchParams);
    const editDelta = stripEmptyProps(props.editDelta);
    const defaultSearchParams = {
      countryNameContains: "",
      populationGte: props.searchMetadata.populationLowerBound,
      populationLte: props.searchMetadata.populationUpperBound,
    };
    const x = { ...defaultSearchParams, ...searchParams, ...editDelta };
    const renderCallback = React.useContext(RenderCallbackContext)["SearchParameters"];
    if (renderCallback) {
      return renderCallback(props);
    }
    return (
      <SearchParametersPresentational searchParams={x} searchMetadata={searchMetadata} />
    );
  },
  {
    searchMetadata: graphql`
      fragment SearchParameters_searchMetadata on CitiesMetadata {
        populationLowerBound
        populationUpperBound
      }
    `,
    searchParams: graphql`
      fragment SearchParameters_searchParams on UICitySearchParams {
        countryNameContains
        populationGte
        populationLte
      }
    `,
    editDelta: graphql`
      fragment SearchParameters_editDelta on UICitySearchParams {
        countryNameContains
        populationGte
        populationLte
      }
    `,
  }
);

export const defaultData = {
  searchMetadata: {
    populationLowerBound: 1000,
    populationUpperBound: 1000000,
  } as SearchParameters_searchMetadata,
  searchParams: {
    countryNameContains: "",
    populationGte: 1000,
    populationLte: 1000000,
  } as SearchParameters_searchParams,
  editDelta: null,
};

export default function(environment: IEnvironment) {
  return (
    <LoadingPlaceholderQueryRenderer<SearchParametersQuery>
      query={graphql`
        query SearchParametersQuery {
          citiesMetadata {
            ...SearchParameters_searchMetadata
          }
          uiState {
            citySearchParams {
              ...SearchParameters_searchParams
            }
            citySearchParamsEditDelta {
              ...SearchParameters_editDelta
            }
          }
        }
      `}
      environment={environment}
      variables={{}}
      placeholderData={{
        citiesMetadata: { ...defaultData.searchMetadata },
        uiState: {
          citySearchParams: { ...defaultData.searchParams },
        },
      }}
      render={({ props }) => {
        return (
          props &&
          props.citiesMetadata && (
            <SearchParametersFC
              searchMetadata={props.citiesMetadata}
              searchParams={props.uiState?.citySearchParams || null}
              editDelta={props.uiState?.citySearchParamsEditDelta || null}
              environment={environment}
            />
          )
        );
      }}
    />
  );
}
