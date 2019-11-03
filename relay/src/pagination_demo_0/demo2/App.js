// @flow

import { QueryRenderer, graphql } from "react-relay";
import React from "react";

import environment from "./Environment";

const App = () => {
  return (
    <div>
      <PostsView listingId="xxx1" />
      <PostsView listingId="xxx2" />
    </div>
  );
};

export default App;
