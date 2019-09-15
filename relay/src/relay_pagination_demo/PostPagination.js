// @flow
/* globals $PropertyType */

import React from 'react'
import PostDetails from './PostDetails'

import type  { RelayProp } from 'react-relay'
import type { PostFeed_search } from './__generated__/PostFeed_search.graphql'

type PostConnection = $PropertyType<PostFeed_search, 'posts'>

type Props = {| 
  relay: RelayProp,
  posts: PostConnection,
|}

const Pagination = ({relay, posts}: Props) => {
  console.log("BBBBBBBBB", posts)
  function goNext() {

    if ( !posts ) {
      return
    }

    relay.refetch(
      {
        first: 3,
        after: posts.pageInfo.endCursor,
        last: null,
        before: null,
        orderBy: null,
      },
      null,
      () => console.log('next done!'))
  }

  function goPrev() {

    if ( !posts ) {
      return
    }

    relay.refetch(
      {
        first: null,
        after: null,
        last: 3,
        before: posts.pageInfo.startCursor,
        orderBy: null,
      },
      null,
      () => console.log('prev done!'))
  }

  const nodes = 
    posts && posts.edges
      ? posts.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = posts?.pageInfo?.hasPreviousPage
  const hasNext = posts?.pageInfo?.hasNextPage

  return (
    <div>
      <div>
        {nodes.map(node => <PostDetails post={node} key={node.id}/>)}
      </div>
      {hasPrev && <button onClick={goPrev}>PREV</button>}
      {hasNext && <button onClick={goNext}>NEXT</button>}
    </div>
  )
}

export default Pagination