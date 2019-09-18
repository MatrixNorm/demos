// @flow
/* globals $PropertyType */

import React from 'react'
import PostDetails from './PostDetails'
import type { PostFeed_search } from './__generated__/PostFeed_search.graphql'

type PostConnection = $PropertyType<PostFeed_search, 'posts'>

type Props = {| 
  refetch: any,
  items: PostConnection,
|}

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

const PostPagination = ({refetch, items}: Props) => {

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
        {nodes.map(node => <PostDetails post={node} key={node.id}/>)}
      </div>
      {hasPrev && <button onClick={handlePrev}>PREV</button>}
      {hasNext && <button onClick={handleNext}>NEXT</button>}
    </div>
  )
}

export default PostPagination