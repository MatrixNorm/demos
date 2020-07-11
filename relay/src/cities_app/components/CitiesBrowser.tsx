import * as React from "react";
import { useEffect } from "react";
import { graphql, LocalQueryRenderer } from "react-relay";
import { commitLocalUpdate, IEnvironment, ROOT_ID } from "relay-runtime";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import SearchParameters from "./SearchParameters";
import CitiesPaginationComponent from "./CitiesPaginationRefetchContainer";
import { SearchParametersPresentational } from "./SearchParametersPresentational";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import LoadingContext, { placeholderCssMixin } from "../verysmart/LoadingContext";
import { retainRecord } from "../helpers/relayStore";
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

function commitSearchParamsInRelayStore(
  searchParams: NukeFragRef<SearchParameters_searchParams>,
  environment: IEnvironment
) {
  console.log(searchParams);
  commitLocalUpdate(environment, (store) => {
    const searchParamsRecord = store
      .get(ROOT_ID)
      ?.getOrCreateLinkedRecord("uiState", "UIState")
      ?.getOrCreateLinkedRecord("citySearchParams", "UICitySearchParams");
    if (searchParamsRecord) {
      for (let key of [
        "countryNameContains",
        "populationGte",
        "populationLte",
      ] as (keyof UserSettings)[]) {
        searchParamsRecord.setValue(searchParams[key], key);
      }
    }
  });
  retainRecord(
    graphql`
      query SearchParametersUiQuery {
        __typename
        uiState {
          citySearchParams {
            ...SearchParameters_searchParams
          }
        }
      }
    `,
    environment
  );
}

export default ({ environment }: { environment: IEnvironment }) => {
  const location = useLocation();
  console.log(location);

  useEffect(
    function() {
      let qp = new URLSearchParams(location.search);
      let searchParams: any = {};
      if (qp.has("countryNameContains")) {
        searchParams["countryNameContains"] = qp.get("countryNameContains");
      }
      if (Object.keys(searchParams).length > 0) {
        commitSearchParamsInRelayStore(searchParams, environment);
      }
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
