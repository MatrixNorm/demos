import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import { useRouteMatch } from "react-router-dom";
import { LoadingPlaceholderQueryRenderer } from "../verysmart/LoadingContext";
import { toQueryURL } from "../helpers/object";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParametersQuery } from "__relay__/SearchParametersQuery.graphql";

export type SearchParametersType = NukeFragRef<SearchParameters_searchParams>;
export type SearchParametersNonNullType = NukeNulls<SearchParametersType>;
export type SearchMetadataType = NukeFragRef<SearchParameters_searchMetadata>;

export type EventType =
  | ["countryNameContains", string]
  | ["population", { lower: number; upper: number }];

export type RenderCallbackArgsType = {
  dispatch: (event: EventType) => void;
  searchParams: SearchParametersNonNullType;
  searchMetadata: SearchMetadataType;
  showApplyButton: Boolean;
  url: string;
};
export type RenderCallbackType = (args: RenderCallbackArgsType) => any;

type Props = {
  searchMetadata: SearchParameters_searchMetadata;
  searchParams: SearchParameters_searchParams | null;
  environment: IEnvironment;
  render: RenderCallbackType;
};

type EditDelta = Partial<SearchParametersNonNullType>;

const SearchParametersFC = createFragmentContainer(
  function(props: Props) {
    // const defaultSearchParams = {
    //   countryNameContains: "",
    //   populationGte: props.searchMetadata.populationLowerBound,
    //   populationLte: props.searchMetadata.populationUpperBound,
    // };
    const { url } = useRouteMatch();
    const [editDelta, setEditDelta] = React.useState<EditDelta>({});
    const [
      prevSearchParams,
      setPrevSearchParams,
    ] = React.useState<SearchParametersType | null>(null);

    if (JSON.stringify(props.searchParams) !== JSON.stringify(prevSearchParams)) {
      setPrevSearchParams(props.searchParams);
      console.log(1111);
      setEditDelta({});
    }

    function dispatch(event: EventType) {
      if (event[0] === "population") {
        setEditDelta((prevState) => ({
          ...prevState,
          populationGte: event[1].lower,
          populationLte: event[1].upper,
        }));
        return;
      }
      let [fieldName, fieldValue] = event;
      setEditDelta((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    }
    console.log(props.searchParams, editDelta);
    return props.render({
      dispatch,
      searchParams: {
        ...{
          countryNameContains: props.searchParams?.countryNameContains || "",
          populationGte:
            props.searchParams?.populationGte ||
            props.searchMetadata.populationLowerBound,
          populationLte:
            props.searchParams?.populationLte ||
            props.searchMetadata.populationUpperBound,
        },
        ...editDelta,
      },
      searchMetadata: props.searchMetadata,
      showApplyButton: Object.keys(editDelta).length > 0,
      url: `${url}?${toQueryURL(editDelta)}`,
    });
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
  },
  searchParams: {
    countryNameContains: "",
    populationGte: 1000,
    populationLte: 1000000,
  },
};

export default function({
  environment,
  render,
}: {
  environment: IEnvironment;
  render: RenderCallbackType;
}) {
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
              environment={environment}
              render={render}
            />
          )
        );
      }}
    />
  );
}
