// @flow

import React from 'react'

type Connection = {
 pageInfo: PageInfo,
 edges: Array<?PostEdge>,
};

type PageInfo = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor?: ?string,
  endCursor?: ?string,
 };

type PostEdge = {
 node?: ?any,
 cursor: string,
};

function goNext(items, refetch) {
  if ( items ) {
    refetch(
      {
        first: 3,
        after: items.pageInfo.endCursor,
        last: null,
        before: null,
        orderBy: null,
      },
      null,
      () => console.log('next done!'))
  }
}

function goPrev(items, refetch) {
  if ( items ) {
    refetch(
      {
        first: null,
        after: null,
        last: 3,
        before: items.pageInfo.startCursor,
        orderBy: null,
      },
      null,
      () => console.log('prev done!'))
  }
}

type Props = {
  refetch: any,
  items: ?Connection
}

const Pagination = ({refetch, items}: Props) => {

  function handleNext() {
    goNext(items, refetch)
  }

  function handlePrev() {
    goPrev(items, refetch)
  }

  const nodes = 
    items && items.edges
      ? items.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = items?.pageInfo.hasPreviousPage
  const hasNext = items?.pageInfo.hasNextPage

  return (
    <div>
      <div>
        {/* XXX this is Post specific */}
        {nodes}
      </div>
      {hasPrev && <button onClick={handlePrev}>PREV</button>}
      {hasNext && <button onClick={handleNext}>NEXT</button>}
    </div>
  )
}

export default Pagination