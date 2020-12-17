import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch, useHistory } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import * as CSPController from "./CitySearchParametersController";
import { SearchParametersDisplayComponent } from "./componentDisplay";
import * as md from "./model";
import * as t from "./types";
import { CitySearchParameters_metadata } from "__relay__/CitySearchParameters_metadata.graphql";
import { CitySearchParameters_state } from "__relay__/CitySearchParameters_state.graphql";
import { CitySearchParametersQuery } from "__relay__/CitySearchParametersQuery.graphql";

function calcDisplayData(
  metadata: t.Metadata | null,
  state: t.State | null
): { fields: t.Fields; metadata: t.Metadata } {
  const defaultMetadata: t.Metadata = {
    populationLowerBound: 0,
    populationUpperBound: 10 ** 8,
  };

  const finalMetadata: t.Metadata = { ...defaultMetadata, ...metadata };

  const defaultSearchParams: md.CitySearchParamsShape = {
    countryNameContains: "",
    populationGte: finalMetadata.populationLowerBound,
    populationLte: finalMetadata.populationUpperBound,
  };

  const fields = Object.fromEntries(
    Object.entries(defaultSearchParams).map(([prop, defaultValue]) => {
      let s = state || {};
      return [
        prop,
        {
          // @ts-ignore
          value: (s.value || {})[prop] || (state?.draft || {})[prop] || defaultValue,
          // @ts-ignore
          error: (s.errors || {})[prop],
        },
      ];
    })
  ) as t.Fields;

  return { fields, metadata: finalMetadata };
}

type Props = {
  metadata: CitySearchParameters_metadata | null;
  citySearchParamsState: CitySearchParameters_state | null;
  environment: IEnvironment;
};

const SearchParametersFC = createFragmentContainer(
  (props: Props) => {
    const { url: baseUrl } = useRouteMatch();
    const history = useHistory();

    const { fields, metadata } = calcDisplayData(
      props.metadata,
      props.citySearchParamsState
    );

    function onEdit(delta: CSPController.EditPayload) {
      CSPController.handleEvent({ type: "edit", payload: delta }, props.environment);
    }

    function onSubmit() {
      CSPController.handleEvent(
        { type: "submit", payload: { history, baseUrl } },
        props.environment
      );
    }

    const args = {
      fields,
      metadata,
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
      fragment CitySearchParameters_metadata on CitiesMetadata {
        populationLowerBound
        populationUpperBound
      }
    `,
    state: graphql`
      fragment CitySearchParameters_state on UIState {
        citySearchParams {
          countryNameContains
          populationGte
          populationLte
        }
        citySearchParamsDraft {
          countryNameContains
          populationGte
          populationLte
        }
      }
    `,
  }
);

export const defaultData = {
  metadata: null,
  searchParams: null,
};

export default function({ environment }: { environment: IEnvironment }) {
  let query = graphql`
    query CitySearchParametersQuery {
      citiesMetadata {
        ...CitySearchParameters_metadata
      }
      uiState {
        ...CitySearchParameters_state
      }
    }
  `;

  return (
    <LoadingPlaceholderQueryRenderer<CitySearchParametersQuery>
      query={query}
      environment={environment}
      variables={{}}
      placeholderData={{
        citiesMetadata: defaultData.metadata,
        uiState: {
          citySearchParams: defaultData.searchParams,
        },
      }}
      render={({ props }) => {
        return (
          <SearchParametersFC
            metadata={props.citiesMetadata || null}
            citySearchParamsState={props.uiState?.citySearchParamsState || null}
            environment={environment}
          />
        );
      }}
    />
  );
}
