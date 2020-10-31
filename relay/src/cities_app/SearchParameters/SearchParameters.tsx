import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch, useHistory } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import * as SPController from "./SearchParametersController";
import { SearchParametersDisplayComponent } from "./componentDisplay";
import * as t from "./types";
import { NukeFragRef } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

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
  metadata: SearchParameters_metadata | null;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
};

const SearchParametersFC = createFragmentContainer(
  (props: Props) => {
    const { url: baseUrl } = useRouteMatch();
    const history = useHistory();
    const { fieldsData, metadata } = calcDisplayData(props.metadata, props.searchParams);

    function onEdit(delta: t.SPEditPayload) {
      SPController.handleEvent({ type: "edit", payload: delta }, props.environment);
    }

    function onSubmit() {
      SPController.handleEvent(
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
      fragment SearchParameters_metadata on CitiesMetadata {
        populationLowerBound
        populationUpperBound
      }
    `,
    searchParams: graphql`
      fragment SearchParameters_searchParams on UICitySearchParams {
        countryNameContains {
          value
          draft {
            value
            error
          }
        }
        populationGte {
          value
          draft {
            value
            error
          }
        }
        populationLte {
          value
          draft {
            value
            error
          }
        }
      }
    `,
  }
);

export const defaultData = (function() {
  let metadata: t.Metadata = {
    populationLowerBound: 1000,
    populationUpperBound: 1000000,
  };
  let searchParams: t.SP = {
    countryNameContains: { value: "", draft: null },
    populationGte: { value: 1000, draft: null },
    populationLte: { value: 1000000, draft: null },
  };
  return {
    metadata,
    searchParams,
  };
})();

export default function({ environment }: { environment: IEnvironment }) {
  let query = graphql`
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

  return (
    <LoadingPlaceholderQueryRenderer<SearchParametersQuery>
      query={query}
      environment={environment}
      variables={{}}
      placeholderData={{
        citiesMetadata: { ...defaultData.metadata },
        uiState: {
          citySearchParams: { ...defaultData.searchParams },
        },
      }}
      render={({ props }) => {
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
