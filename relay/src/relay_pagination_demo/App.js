// @flow

import { QueryRenderer, graphql } from 'react-relay'
import React, { useState } from 'react'

import environment from './Environment'
import PostFeed from './PostFeed'

import type { AppQueryResponse, PostOrdering, PostOrderingFields } from './__generated__/AppQuery.graphql'

type RenderProps = {|
  +error: Error, 
  +props: AppQueryResponse
|}

const AppQuery = graphql`
  query AppQuery($first: Int
                 $after: String
                 $last: Int
                 $before: String
                 $orderBy: PostOrdering) {
    x1: search {
      ...PostFeed_search @arguments(
        first: $first,
        after: $after,
        last: $last,
        before: $before,
        orderBy: $orderBy)
    }
    x2: search {
      ...PostFeed_search @arguments(
        first: $first,
        after: $after,
        last: $last,
        before: $before,
        orderBy: $orderBy)
    }
  }
`
const render = ({error, props}: RenderProps) => {
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return (
    <>
      <PostFeed search={props.x1} />
      <PostFeed search={props.x2} />
    </>
  )
}

const App = () => {
  return (
    <QueryRenderer
      query={AppQuery}
      environment={environment}
      variables={{ first: 3, after: null, orderBy: {field: 'createdAt'} }}
      render={render}/>
  )
}

export default App