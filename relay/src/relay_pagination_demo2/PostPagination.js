// @flow
/* globals $PropertyType */

import React, { useContext } from "react";
import { pagination } from "./pagination";
import PostDetails from "./PostDetails";
import { PostFeedContext } from "./PostFeedContext";
import type { PostFeed_search } from "./__generated__/PostFeed_search.graphql";

type PostConnection = $PropertyType<PostFeed_search, "posts">;
type PostContext = {| refetch: any, posts: PostConnection |};

const PostPagination = () => {
  const { refetch, posts }: PostContext = useContext(PostFeedContext);
  if (posts) {
    const { nodes, hasNext, hasPrev, handleNext, handlePrev } = pagination({
      refetch,
      connection: posts
    });

    return (
      <div>
        <div>
          {nodes.map(node => (
            <PostDetails post={node} key={node.id} />
          ))}
        </div>
        {hasPrev && <button onClick={handlePrev}>PREV</button>}
        {hasNext && <button onClick={handleNext}>NEXT</button>}
      </div>
    );
  } else {
    return (
      <h1>Shit... no connection</h1>
    )
  }
};

export default PostPagination;
