// @flow
/* globals $PropertyType */

import React, { useContext } from 'react'
import Pagination from './Pagination'
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

  return (
    <Pagination items={posts} 
                refetch={refetch} 
                renderCallback={renderCallback} />
  )
}

export default PostPagination