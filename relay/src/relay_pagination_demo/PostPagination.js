// @flow
/* globals $PropertyType */

import React from 'react'
import Pagination from './Pagination'
import PostDetails from './PostDetails'
import type { PostFeed_search } from './__generated__/PostFeed_search.graphql'

type PostConnection = $PropertyType<PostFeed_search, 'posts'>

type Props = {| 
  refetch: any,
  items: PostConnection,
|}

const PostPagination = ({refetch, items}: Props) => {

  const renderCallback = ({ nodes, hasNext, hasPrev, handleNext, handlePrev }) => {
    return (
      <div>
        <div>
          {nodes.map(node => <PostDetails post={node} key={node.id}/>)}
        </div>
        {hasPrev && <button onClick={handlePrev}>PREV</button>}
        {hasNext && <button onClick={handleNext}>NEXT</button>}
      </div>
    )
  }

  return <Pagination items={items} refetch={refetch} renderCallback={renderCallback} />
}

export default PostPagination