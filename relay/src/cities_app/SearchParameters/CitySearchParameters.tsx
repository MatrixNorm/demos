import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch, useHistory } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import * as CSPController from "./CitySearchParametersController";
import { SearchParametersDisplayComponent } from "./componentDisplay";
import { NukeFragRef } from "../helpers/typeUtils";
import { CitySearchParameters_metadata } from "__relay__/CitySearchParameters_metadata.graphql";
import { CitySearchParameters_state } from "__relay__/CitySearchParameters_state.graphql";
import { CitySearchParametersQuery } from "__relay__/CitySearchParametersQuery.graphql";

function calcDisplayData(
  metadata: SearchParameters_metadata | null,
  searchParams: SearchParameters_searchParams | null
): { fieldsData: t.SPDisplayed; metadata: t.Metadata } {
  const defaultMetadata: NukeFragRef<SearchParameters_metadata> = {
    populationLowerBound: 0,
    populationUpperBound: 10 ** 8,
  };

  const finalMetadata: t.Metadata = { ...defaultMetadata, ...metadata };

  const defaultSearchParams: t.SPValues = {
    countryNameContains: "",
    populationGte: finalMetadata.populationLowerBound,
    populationLte: finalMetadata.populationUpperBound,
  };

  const fieldsData = Object.fromEntries(
    Object.entries(defaultSearchParams).map(([prop, defaultValue]) => {
      let sp = searchParams || {};
      return [
        prop,
        {
          // @ts-ignore
          value: sp[prop]?.draft?.value || sp[prop]?.value || defaultValue,
          // @ts-ignore
          error: sp[prop]?.draft?.error || null,
        },
      ];
    })
  ) as t.SPDisplayed;

  return { fieldsData, metadata: finalMetadata };
}

type Props = {
  metadata: CitySearchParameters_metadata | null;
  citySearchParamsState: CitySearchParameters_state | null;
  environment: IEnvironment;
};

const SearchParametersFC = createFragmentContainer(
  (props: Props) => {
    console.log(props);
    const { url: baseUrl } = useRouteMatch();
    const history = useHistory();
    const { fieldsData, metadata } = calcDisplayData(props.metadata, props.citySearchParamsState);

    function onEdit(delta: t.SPEditDelta) {
      CSPController.handleEvent({ type: "edit", payload: delta }, props.environment);
    }

    function onSubmit() {
      CSPController.handleEvent(
        { type: "submit", payload: { history, baseUrl } },
        props.environment
      );
    }

    const args = {
      fields: fieldsData,
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
      fragment CitySearchParameters_state on UICitySearchParamsState {
        value {
          countryNameContains
          populationGte
          populationLte
        }
        draft {
          countryNameContains
          populationGte
          populationLte
        }
        errors {
          countryNameContains
          populationGte
          populationLte
          _
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
        citySearchParamsState {
          ...CitySearchParameters_state
        }
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
