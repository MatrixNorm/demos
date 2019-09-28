// @flow
/* globals $PropertyType $NonMaybeType */

import React, { useContext } from "react";
import { pagination } from "./pagination";
import PostDetails from "./PostDetails";
import {
  PostFeedContext,
  type PostFeedContextValueType
} from "./PostFeedContext";

const PostPagination = () => {
  const { refetch, posts, isLoading }: PostFeedContextValueType = useContext(
    PostFeedContext
  );

  if (posts) {
    const { nodes, hasNext, hasPrev, handleNext, handlePrev } = pagination({
      refetch,
      connection: posts
    });

    return (
      <div>
        <div>
          {isLoading ? (
            <h2>loading...</h2>
          ) : (
            nodes.map(node => <PostDetails post={node} key={node.id} />)
          )}
        </div>
        {hasPrev && <button onClick={handlePrev}>PREV</button>}
        {hasNext && <button onClick={handleNext}>NEXT</button>}
      </div>
    );
  } else {
    return <h1>Shit... no connection</h1>;
  }
};

export default PostPagination;
