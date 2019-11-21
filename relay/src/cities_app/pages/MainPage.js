// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";
import environment from "../env";
import CitiesPaginationParametersPanel from "../components/CitiesPaginationParametersPanel";
import CitiesPaginationListPanel from "../components/CitiesPaginationListPanel";

export default function MainPage() {
  return (
    <QueryRenderer
      query={graphql`
        query MainPageQuery {
          citiesMetadata {
            ...CitiesPaginationParametersPanel_params
          }
          viewer {
            cityFilters {
              id
              name
            }
            pinnedCityFilter {
              id
              name
            }
          }
        }
      `}
      environment={environment}
      variables={{ pageNo: 0 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <div>
            <CitiesPaginationParametersPanel params={props.citiesMetadata} />
            <CitiesPaginationListPanel />
          </div>
        );
      }}
    />
  );
}
