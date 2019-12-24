import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "theapp/env";
import CitiesPaginationParametersPanel from "./CitiesPaginationParametersPanel";
import CitiesPaginationListingPanel from "./CitiesPaginationListingPanel";

export default function MainPage() {
  return (
    <QueryRenderer
      query={graphql`
        query MainPageQuery {
          citiesMetadata {
            ...CitiesPaginationParametersPanel_metadata
          }
          viewer {
            citiesDefaultPagination(pageSize: $pageSize) {
              ...CitiesPaginationListingPanel_cities
            }
          }
        }
      `}
      environment={environment}
      variables={{ pageSize: 10 }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return (
          <div>
            <div>
              <CitiesPaginationParametersPanel params={props.citiesMetadata} />
            </div>
            <div>
              <CitiesPaginationListingPanel cities={props.viewer.citiesDefaultPagination}/>
            </div>
          </div>
        );
      }}
    />
  );
}
