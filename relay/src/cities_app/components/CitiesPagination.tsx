/**
 * Single page of pagination.
 */
import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { NextButton, PrevButton } from "../elements/Buttons";
import CitySummary, { defaultData as cityDefaultData } from "./CitySummary";
import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";

const CitiesList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding-bottom: 1em;
  }
`;

const Page = styled.div`
  .controls-container {
    text-align: center;
  }
`;

interface Props {
  page: CitiesPagination_page;
  loadPrevPage: (page: CitiesPagination_page) => void;
  loadNextPage: (page: CitiesPagination_page) => void;
}

export default createFragmentContainer(
  ({ page, loadPrevPage, loadNextPage }: Props) => {
    const { nodes, hasNext, hasPrev } = page;
    return (
      <Page>
        <CitiesList>
          {nodes &&
            nodes.map((city) => (
              <li key={city.id}>
                <CitySummary city={city} />
              </li>
            ))}
        </CitiesList>
        <div className="controls-container">
          <div className="controls">
            {hasPrev && <PrevButton onClick={() => loadPrevPage(page)} />}
            {hasNext && <NextButton onClick={() => loadNextPage(page)} />}
          </div>
        </div>
      </Page>
    );
  },
  {
    page: graphql`
      fragment CitiesPagination_page on CitiesPagination {
        hasNext
        hasPrev
        nodes {
          id
          ...CitySummary_city
        }
      }
    `,
  }
);

export const defaultData = {
  hasNext: false,
  hasPrev: false,
  nodes: [
    { ...cityDefaultData, id: "1" },
    { ...cityDefaultData, id: "2" },
    { ...cityDefaultData, id: "3" },
    { ...cityDefaultData, id: "4" },
    { ...cityDefaultData, id: "5" },
  ],
};
