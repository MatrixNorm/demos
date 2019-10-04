// @flow
/* globals $PropertyType */

import React, { useContext } from "react";
import Pagination from "./Pagination";
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
  const { refetch, posts }: Props = useContext(PostFeedContext);

  const renderCallback = ({
    nodes,
    hasNext,
    hasPrev,
    handleNext,
    handlePrev
  }) => {
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
  };

  return (
    <Pagination
      items={posts}
      refetch={refetch}
      renderCallback={renderCallback}
    />
  );
};

export default PostPagination;
