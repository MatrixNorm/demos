// @flow

import React from "react";
import PostsView from "./PostsView";

const App = () => {
  return (
    <div>
      <PostsView listingId="postListing#1" />
      <PostsView listingId="postListing#2" />
    </div>
  );
};

export default App;
