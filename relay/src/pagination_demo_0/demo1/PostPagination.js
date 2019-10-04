// @flow

import React, { useContext } from "react";
import PostDetails from "./PostDetails";
import {
  PostFeedContext,
  type PostConnection,
  type RefetchFunction
} from "./PostFeedContext";

type Props = {|
  +refetch: RefetchFunction,
  +posts: PostConnection
|};

const PostPagination = () => {
  const { dispatch, posts }: Props = useContext(PostFeedContext);

  const nodes =
    posts && posts.edges
      ? posts.edges
          .filter(Boolean)
          .map(edge => edge.node)
          .filter(Boolean)
      : [];

  const hasPrev = posts?.pageInfo.hasPreviousPage;
  const hasNext = posts?.pageInfo.hasNextPage;

  return (
    <div>
      <div>
        {nodes.map(node => (
          <PostDetails post={node} key={node.id} />
        ))}
      </div>
      {hasPrev && (
        <button
          onClick={() => {
            dispatch({ type: "PREV_PAGE" });
          }}
        >
          PREV
        </button>
      )}
      {hasNext && (
        <button
          onClick={() => {
            dispatch({ type: "NEXT_PAGE" });
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default PostPagination;
