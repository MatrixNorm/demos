import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { NextButton, PrevButton } from "../elements/Buttons";
import CitySummary, { CitySummarySkeleton } from "./CitySummary";
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
  display: inline-block;
  .controls-container {
    text-align: center;
  }
`;

interface Props {
  page: CitiesPagination_page;
  loadPrevPage: any;
  loadNextPage: any;
}

/**
 * Single page of pagination.
 * Doesn't know how to load prev and next page - needs callbacks for that.
 */
function CitiesPagination({ page, loadPrevPage, loadNextPage }: Props) {
  const { nodes, hasNext, hasPrev } = page;
  return (
    <Page>
      <CitiesList>
        {nodes &&
          nodes.map(city => (
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
}

export default createFragmentContainer(CitiesPagination, {
  page: graphql`
    fragment CitiesPagination_page on CitiesPagination {
      hasNext
      hasPrev
      nodes {
        id
        ...CitySummary_city
      }
    }
  `
});

export function CitiesPaginationSkeleton() {
  return (
    <Page>
      <CitiesList>
        <li key="1">
          <CitySummarySkeleton />
        </li>
        <li key="2">
          <CitySummarySkeleton />
        </li>
        <li key="3">
          <CitySummarySkeleton />
        </li>
      </CitiesList>
      <div className="controls-container">
        <div className="controls">
          <PrevButton onClick={() => {}} />
          <NextButton onClick={() => {}} />
        </div>
      </div>
    </Page>
  );
}
