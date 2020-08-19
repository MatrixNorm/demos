import * as React from "react";
import { graphql, LocalQueryRenderer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import styled from "styled-components";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import CitiesPaginationComponent from "./CitiesPaginationRefetchContainer";
import SearchParameters from "./SearchParameters";
import * as SearchParametersController from "../mutations/SearchParametersController";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import LoadingContext, { placeholderCssMixin } from "../verysmart/LoadingContext";
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

export default ({ environment }: { environment: IEnvironment }) => {
  const location = useLocation();
  console.log(location);

  SearchParametersController.handleEvent(
    {
      type: "routeEnter",
      urlSearchString: location.search,
    },
    environment
  );

  return (
    <PanelBlock>
      <div className="search-params-wrapper">
        <SearchParameters environment={environment} />
      </div>
      <div className="pagination-panel-wrapper">
        <RenderCallbackContext.Provider value={{ CitySummary: renderCitySummary }}>
          <LocalQueryRenderer<CitiesBrowserUiQuery>
            query={graphql`
              query CitiesBrowserUiQuery {
                ... on Query {
                  __typename
                }
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
  const { url } = useRouteMatch();
  const isLoading = React.useContext(LoadingContext);
  const CitySummary = isLoading ? CitySummaryLoading : CitySummarySuccess;
  return (
    <CitySummary>
      <div className="row">
        <Link
          className="country placeholder"
          to={`${url}?countryNameContains=${city.country}`}
        >
          {city.country}
        </Link>
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
