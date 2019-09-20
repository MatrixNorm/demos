// @flow
/* globals $PropertyType */

import React, { useContext } from 'react'
import { usePagination } from './Pagination'
import PostDetails from './PostDetails'
import { PostFeedContext } from './PostFeedContext'
import type { PostFeed_search } from './__generated__/PostFeed_search.graphql'

type PostConnection = $PropertyType<PostFeed_search, 'posts'>

type Props = {| 
  refetch: any,
  posts: PostConnection,
|}

const PostPagination = () => {

  const { refetch, posts }: Props = useContext(PostFeedContext)
  const { nodes, hasNext, hasPrev, handleNext, handlePrev } = usePagination({ refetch, items: posts })

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

export default PostPagination