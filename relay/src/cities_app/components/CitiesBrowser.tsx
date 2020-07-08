import * as React from "react";
import { graphql, LocalQueryRenderer } from "react-relay";
import { IEnvironment } from "relay-runtime";
import styled from "styled-components";
import SearchParameters from "./SearchParameters";
import CitiesPaginationComponent from "./CitiesPaginationRefetchContainer";
import { SearchParametersPresentational } from "./SearchParametersPresentational";
import { CitiesBrowserUiQuery } from "__relay__/CitiesBrowserUiQuery.graphql";

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
        <XXX environment={environment}>
          {({ props }: { props: CitiesBrowserUiQuery["response"] | null }) => {
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
        </XXX>
      </div>
    </PanelBlock>
  );
};

const XXX = ({
  environment,
  children,
}: {
  environment: IEnvironment;
  children: ({ props }: { props: CitiesBrowserUiQuery["response"] | null }) => any;
}) => {
  return (
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
      render={children}
    />
  );
};
