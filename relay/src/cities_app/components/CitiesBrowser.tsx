import * as React from "react";
import { useEffect } from "react";
import { graphql, LocalQueryRenderer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import SearchParameters, {
  commitSearchParamsInRelayStore,
  SearchParametersNonNullType,
} from "./SearchParameters";
import CitiesPaginationComponent from "./CitiesPaginationRefetchContainer";
import { SearchParametersPresentational } from "./SearchParametersPresentational";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import LoadingContext, { placeholderCssMixin } from "../verysmart/LoadingContext";

import { Writeable } from "../helpers/typeUtils";
import { CitiesBrowserUiQuery } from "__relay__/CitiesBrowserUiQuery.graphql";
import { CitySummary_city } from "__relay__/CitySummary_city.graphql";

const PanelBlock = styled.div`
  display: flex;
  .search-params-wrapper {
    width: 200px;
  }
  .pagination-panel-wrapper {
    width: 400px;
    margin-left: 30px;
  }
`;

function extractSearchParametersFromUrlQueryString(
  urlQueryString: string
): Partial<SearchParametersNonNullType> | null {
  let qp = new URLSearchParams(urlQueryString);
  let searchParams: Writeable<Partial<SearchParametersNonNullType>> = {};
  if (qp.has("countryNameContains")) {
    searchParams["countryNameContains"] = qp.get("countryNameContains") || undefined;
  }
  if (qp.has("populationGte")) {
    let value = Number(qp.get("populationGte"));
    if (value) {
      searchParams["populationGte"] = value;
    }
  }
  if (qp.has("populationLte")) {
    let value = Number(qp.get("populationLte"));
    if (value) {
      searchParams["populationLte"] = value;
    }
  }
  if (Object.keys(searchParams).length > 0) {
    return searchParams;
  }
  return null;
}

export default ({ environment }: { environment: IEnvironment }) => {
  const location = useLocation();
  console.log(location);

  useEffect(
    function() {
      let searchParams = extractSearchParametersFromUrlQueryString(location.search);
      commitSearchParamsInRelayStore(searchParams, environment);
    },
    [location]
  );

  return (
    <PanelBlock>
      <div className="search-params-wrapper">
        <SearchParameters
          environment={environment}
          render={(props) => {
            return <SearchParametersPresentational {...props} />;
          }}
        />
      </div>
      <div className="pagination-panel-wrapper">
        <RenderCallbackContext.Provider value={{ CitySummary: renderCitySummary }}>
          <LocalQueryRenderer<CitiesBrowserUiQuery>
            query={graphql`
              query CitiesBrowserUiQuery {
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
              return (
                <CitiesPaginationComponent
                  environment={environment}
                  searchParams={
                    props?.uiState?.citySearchParams || {
                      countryNameContains: null,
                      populationGte: null,
                      populationLte: null,
                    }
                  }
                />
              );
            }}
          />
        </RenderCallbackContext.Provider>
      </div>
    </PanelBlock>
  );
};

const CitySummarySuccess = styled.section`
  padding: 0 1em 0 1em;
  .row {
    text-align: right;
  }
  .row-name {
    text-align: left;
    margin: 0.2em 0 0.2em 0;
  }
  .name {
    margin-right: 2px;
    font-weight: bold;
  }
  .country {
    font-size: 0.85em;
    color: #00bcd4;
  }
  .population-label {
    font-size: 0.9em;
    margin-right: 15px;
  }
  .placeholder {
    position: relative;
  }
`;

const CitySummaryLoading = styled(CitySummarySuccess)`
  ${placeholderCssMixin}
`;

function renderCitySummary({ city }: { city: CitySummary_city }) {
  const isLoading = React.useContext(LoadingContext);
  const CitySummary = isLoading ? CitySummaryLoading : CitySummarySuccess;
  return (
    <CitySummary>
      <div className="row">
        <a className="country placeholder" href="#">
          {city.country}
        </a>
      </div>
      <div className="row row-name">
        <span className="name placeholder">{city.name}</span>
      </div>
      <div className="row placeholder">
        <label className="population-label">pop.</label>
        <span className="population">{city.population}</span>
      </div>
    </CitySummary>
  );
}
