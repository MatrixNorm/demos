import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import { ReloadMessage } from "../verysmart/ReloadContext";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import * as SPController from "../mutations/SearchParametersController";
import {
  SearchParametersPresentational,
  SearchParametersType,
} from "./SearchParametersPresentational";
import { toQueryURL, compact, Compacted } from "../helpers/object";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

type Props = {
  searchMetadata: SearchParameters_searchMetadata;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
};

const SearchParametersFC = createFragmentContainer(
  (props: Props) => {
    const { url } = useRouteMatch();

    const searchParamsCompacted = compact(props.searchParams);
    const editDeltaCompacted = compact(props.editDelta);

    const defaultSearchParams = {
      countryNameContains: "",
      populationGte: props.searchMetadata.populationLowerBound,
      populationLte: props.searchMetadata.populationUpperBound,
    };

    function onEdit(delta: Partial<SearchParametersType>) {
      SPController.handleEvent(
        { type: "edit", payload: compact(delta) },
        props.environment
      );
    }

    const args = {
      searchParams: {
        ...defaultSearchParams,
        ...searchParamsCompacted,
        ...editDeltaCompacted,
      },
      searchMetadata: props.searchMetadata,
      onEdit,
      url:
        Object.keys(editDeltaCompacted).length > 0
          ? `${url}?${toQueryURL({ ...searchParamsCompacted, ...editDeltaCompacted })}`
          : null,
    };

    const renderCallback = React.useContext(RenderCallbackContext)["SearchParameters"];
    if (renderCallback) {
      return renderCallback(args);
    }

    return <SearchParametersPresentational {...args} />;
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
        countryNameContains {
          value
          draft
          error
        }
        populationGte {
          value
          draft
          error
        }
        populationLte {
          value
          draft
          error
        }
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
    countryNameContains: { value: "" },
    populationGte: { value: 1000 },
    populationLte: { value: 1000000 },
  } as SearchParameters_searchParams,
  editDelta: null,
};

export default function({ environment }: { environment: IEnvironment }) {
  let q = graphql`
    query SearchParametersQuery {
      citiesMetadata {
        ...SearchParameters_searchMetadata
      }
      uiState {
        citySearchParams {
          ...SearchParameters_searchParams
        }
      }
    }
  `;
  console.log(q);
  return (
    <LoadingPlaceholderQueryRenderer<SearchParametersQuery>
      query={q}
      environment={environment}
      variables={{}}
      placeholderData={{
        citiesMetadata: { ...defaultData.searchMetadata },
        uiState: {
          citySearchParams: { ...defaultData.searchParams },
        },
      }}
      render={({ props }) => {
        if (!props.citiesMetadata) {
          return <ReloadMessage message="Something went wrong. Try to reload." />;
        }
        return (
          <SearchParametersFC
            searchMetadata={props.citiesMetadata}
            searchParams={props.uiState?.citySearchParams || null}
            environment={environment}
          />
        );
      }}
    />
  );
}
