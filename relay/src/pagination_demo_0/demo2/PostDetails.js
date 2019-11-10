// @flow

import { createFragmentContainer, graphql } from 'react-relay'
import React from 'react'

import type { PostDetails_post as PostDetailsType } from './__generated__/PostDetails_post.graphql'

type Props = {|
  +post: PostDetailsType
|}

const PostDetails = (props: Props) => {
  const post = props.post;
  return (
    <div>
      <h3>{post.title}</h3>
      <i>by {post.author.name}</i>
    </div>
  )
}

export default createFragmentContainer(PostDetails, {
  post: graphql`
    fragment PostDetails_post on Post {
      title
      author {
        name
      }
    }
  `
})