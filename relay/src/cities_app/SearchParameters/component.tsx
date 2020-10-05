import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch, useHistory } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import * as SPController from "../mutations/SearchParametersController";
import {
  SearchParametersDisplayComponent,
  SearchParametersForDisplay,
  SearchParametersOnlyValues,
} from "./componentDisplay";
import { objKeys } from "../helpers/object";
import { NukeFragRef } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

type Metadata = NukeFragRef<SearchParameters_metadata> | null;
type SearchParams = NukeFragRef<SearchParameters_searchParams> | null;

type Props = {
  metadata: Metadata;
  searchParams: SearchParams;
  environment: IEnvironment;
};

function $$CalcDisplayData$$(
  metadata: Metadata,
  searchParams: SearchParams
): { fields: SearchParametersForDisplay; metadata: NonNullable<Metadata> } {
  const defaultMetadata = {
    populationLowerBound: 0,
    populationUpperBound: 10 ** 8,
  };

  const finalMetadata: NonNullable<Metadata> = { ...defaultMetadata, ...metadata };

  const defaultSearchParams: SearchParametersOnlyValues = {
    countryNameContains: "",
    populationGte: finalMetadata.populationLowerBound,
    populationLte: finalMetadata.populationUpperBound,
  };

  let result: any = {};
  for (let prop of objKeys(defaultSearchParams)) {
    let x = (searchParams || {})[prop];
    if (x) {
      result[prop] = {
        value: x.value || defaultSearchParams[prop],
        error: x.error || null,
      };
    } else {
      result[prop] = {
        value: defaultSearchParams[prop],
        error: null,
      };
    }
  }
  return { fields: result, metadata: finalMetadata };
}

const SearchParametersFC = createFragmentContainer(
  (props: Props) => {
    const { url: baseUrl } = useRouteMatch();
    const history = useHistory();
    const { fields, metadata } = $$CalcDisplayData$$(props.metadata, props.searchParams);

    function onEdit(delta: Partial<SearchParametersOnlyValues>) {
      SPController.handleEvent({ type: "edit", payload: delta }, props.environment);
    }

    function onSubmit() {
      SPController.handleEvent(
        { type: "submit", payload: { history, baseUrl } },
        props.environment
      );
    }

    const args = {
      fields: fields,
      metadata: metadata,
      onEdit,
      onSubmit,
    };
    const renderCallback = React.useContext(RenderCallbackContext)["SearchParameters"];
    if (renderCallback) {
      return renderCallback(args);
    }
    return <SearchParametersDisplayComponent {...args} />;
  },
  {
    metadata: graphql`
      fragment SearchParameters_metadata on CitiesMetadata {
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
  } as SearchParameters_metadata,
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
        ...SearchParameters_metadata
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
        // if (!props.citiesMetadata) {
        //   return <ReloadMessage message="Something went wrong. Try to reload." />;
        // }
        return (
          <SearchParametersFC
            metadata={props.citiesMetadata || null}
            searchParams={props.uiState?.citySearchParams || null}
            environment={environment}
          />
        );
      }}
    />
  );
}
