// @flow

import { QueryRenderer, graphql } from 'react-relay'
import React, { useState } from 'react'

import environment from './Environment'
import PostFeed from './PostFeed'

import type { AppQueryResponse } from './__generated__/AppQuery.graphql'

type RenderProps = {|
  +error: Error, 
  +props: AppQueryResponse
|}

// XXX repeating GraphQL type definition
type PostOrderByType = 'createdAt' | 'viewsCount'

const AppQuery = graphql`
  query AppQuery($first: Int
                 $after: String
                 $last: Int
                 $before: String
                 $orderBy: PostOrdering) {
    ...PostFeed_posts @arguments(first: $first,
                                 after: $after,
                                 last: $last,
                                 before: $before,
                                 orderBy: $orderBy)
  }
`

const render = ({error, props}: RenderProps) => {
  //console.log(props)
  if (error) {
    return <div style={{color: "red"}}>Error: {error.message}</div>;
  }
  if (!props) {
    return <div>Loading...</div>
  }
  return (<PostFeed posts={props} />)
}

const App = () => {
  const [orderBy, setOrderBy]: [PostOrderByType, any] = useState('createdAt')

  const onOrderByChanged = ( orderBy: PostOrderByType ) => {
    console.log(7777777, orderBy)
    setOrderBy(orderBy)
  }

  return (
    <div>
      <div className="...">
        <div>
          <input type="radio" name="paginationOrdering" value="createdAt"
                 checked={orderBy === 'createdAt'} 
                 onChange={() => onOrderByChanged('createdAt')} />
          <label>Recent First</label>
        </div>
        <div>
          <input type="radio" name="paginationOrdering" value="viewsCount"
          checked={orderBy === 'viewsCount'}
          onChange={() => onOrderByChanged('viewsCount')} />
          <label>Most Popular</label>
        </div>
      </div>
      <QueryRenderer
        query={AppQuery}
        environment={environment}
        variables={{first: 3, after: null, orderBy}}
        render={render}/>
    </div>
  )
}

export default App