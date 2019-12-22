// @flow

import { QueryRenderer, graphql } from "react-relay";
import React, { useState } from "react";
import environment from "theapp/env";
import CitiesPaginationParametersPanel from "theapp/components/CitiesPaginationParametersPanel";
import CitiesPaginationListPanel from "theapp/components/CitiesPaginationListPanel";

export default function MainPage() {
  const [searchParams, setSearchParams] = useState({})
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
          <div style={{display: "flex"}}>
            <div style={{flex: 1}}>
             <CitiesPaginationParametersPanel params={props.citiesMetadata} />
            </div>
            <div style={{flex: 2}}>
             <CitiesPaginationListPanel />
            </div>
          </div>
        );
      }}
    />
  );
}
