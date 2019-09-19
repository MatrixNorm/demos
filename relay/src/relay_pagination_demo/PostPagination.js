// @flow
/* globals $PropertyType */

import React from 'react'
import Pagination from './Pagination'
import PostDetails from './PostDetails'
import { PostFeedContextConsumer } from './PostFeed'
import type { PostFeed_search } from './__generated__/PostFeed_search.graphql'

type PostConnection = $PropertyType<PostFeed_search, 'posts'>

type Props = {| 
  refetch: any,
  posts: PostConnection,
|}

const PostPagination = () => {

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
    <PostFeedContextConsumer>
      {({refetch, posts}: Props) => (
        <Pagination items={posts} 
                    refetch={refetch} 
                    renderCallback={renderCallback} />)}
    </PostFeedContextConsumer>
  )
}

export default PostPagination