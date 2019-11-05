// @flow

import React from "react";
import PostsView from "./PostsView";

const App = () => {
  return (
    <div>
      <PostsView listingId="0" />
      <PostsView listingId="1" />
    </div>
  );
};

export default App;
