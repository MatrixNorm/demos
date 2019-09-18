// @flow

import React, { useContext } from 'react'

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

const Pagination = ({ items, render }) => {

  const refetch = useContext('Context.Refetch')

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

  const hasPrev = items?.pageInfo?.hasPreviousPage
  const hasNext = items?.pageInfo?.hasNextPage

  return (
    {/* XXX place something here: render props? compound components? */}
  )
}

export default Pagination