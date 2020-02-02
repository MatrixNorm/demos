import * as React from "react";
import {
  createRefetchContainer,
  QueryRenderer,
  graphql,
  RelayRefetchProp
} from "react-relay";
import { IEnvironment } from "relay-runtime";
import styled from "styled-components";
import SearchParameters from "./SearchParameters";
import CitiesPagination from "./CitiesPagination";
import LoadingIndicator from "../elements/LoadingIndicator";
import LoadingError from "../elements/LoadingError";
import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";
import { CitiesBrowserPanel_cities } from "__relay__/CitiesBrowserPanel_cities.graphql";
import { CitiesBrowserPanelQuery } from "__relay__/CitiesBrowserPanelQuery.graphql";
import { SearchParams } from "../types";

const Panel = styled.div`
  display: flex;
  .outer-panel {
  }

  .search-params-wrapper {
    width: 200px;
  }

  .pagination-panel-wrapper {
    width: 400px;
  }
`;

interface Props {
  cities: CitiesBrowserPanel_cities;
  searchMetadata: any;
  initialSearchParams: any;
  relay: RelayRefetchProp;
}

const CitiesBrowserPanel = ({
  cities,
  searchMetadata,
  initialSearchParams,
  relay
}: Props) => {
  const loadPrevPage = (currentPage: CitiesPagination_page) => {
    currentPage.hasPrevPage &&
      relay.refetch(prevVars => {
        return { ...prevVars, pageNo: currentPage.pageNo - 1 };
      });
  };

  const loadNextPage = (currentPage: CitiesPagination_page) => {
    currentPage.hasNextPage &&
      relay.refetch(nextVars => {
        return { ...nextVars, pageNo: currentPage.pageNo + 1 };
      });
  };

  return (
    <Panel>
      <div className="search-params-wrapper">
        <SearchParameters
          metadata={searchMetadata.citiesMetadata}
          initialSearchParams={initialSearchParams}
          environment={relay.environment}
          refetch={relay.refetch}
        />
      </div>
      <div className="pagination-panel-wrapper">
        {cities.citiesPagination && (
          <CitiesPagination
            page={cities.citiesPagination}
            loadPrevPage={loadPrevPage}
            loadNextPage={loadNextPage}
          />
        )}
      </div>
    </Panel>
  );
};

const CitiesBrowserPanelRC = createRefetchContainer(
  CitiesBrowserPanel,
  {
    cities: graphql`
      fragment CitiesBrowserPanel_cities on Query
        @argumentDefinitions(
          pageNo: { type: "Int!" }
          pageSize: { type: "Int!" }
          searchParams: { type: "CitySearchParamsInput" }
        ) {
        citiesPagination(
          pageNo: $pageNo
          pageSize: $pageSize
          searchParams: $searchParams
        ) {
          ...CitiesPagination_page
        }
      }
    `,
    searchMetadata: graphql`
      fragment CitiesBrowserPanel_searchMetadata on Query {
        citiesMetadata {
          ...SearchParameters_metadata
        }
      }
    `
  },
  graphql`
    query CitiesBrowserPanelRefetchQuery(
      $pageNo: Int!
      $pageSize: Int!
      $searchParams: CitySearchParamsInput
    ) {
      ...CitiesBrowserPanel_cities
        @arguments(
          pageNo: $pageNo
          pageSize: $pageSize
          searchParams: $searchParams
        )
    }
  `
);

interface CitiesBrowserPanelQRProps {
  searchParams: SearchParams;
  environment: IEnvironment;
}

export default function CitiesBrowserPanelQR({
  searchParams,
  environment
}: CitiesBrowserPanelQRProps) {
  return (
    <QueryRenderer<CitiesBrowserPanelQuery>
      query={graphql`
        query CitiesBrowserPanelQuery(
          $pageNo: Int!
          $pageSize: Int!
          $searchParams: CitySearchParamsInput
        ) {
          ...CitiesBrowserPanel_cities
            @arguments(
              pageNo: $pageNo
              pageSize: $pageSize
              searchParams: $searchParams
            )
          ...CitiesBrowserPanel_searchMetadata
        }
      `}
      environment={environment}
      variables={{ pageSize: 5, pageNo: 0, searchParams }}
      render={({ error, props }) => {
        if (error) {
          return <CitiesBrowserPanelError />;
        }
        if (props) {
          return (
            <CitiesBrowserPanelRC
              cities={props}
              searchMetadata={props}
              initialSearchParams={searchParams}
            />
          );
        }
        return <CitiesBrowserPanelLoading />;
      }}
    />
  );
}

function CitiesBrowserPanelLoading() {
  return <LoadingIndicator />;
}

function CitiesBrowserPanelError() {
  return <LoadingError />;
}
