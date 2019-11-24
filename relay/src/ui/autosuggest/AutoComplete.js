// @flow

import React from "react";
import {
  createRefetchContainer,
  graphql,
} from "react-relay";

function AutoComplete({ relay, suggestions }) {
  console.log(suggestions)
  return <div>iii</div>;
}

export default createRefetchContainer(
  AutoComplete,
  {
    suggestions: graphql`
      fragment AutoComplete_suggestions on Viewer {        
      }
    `
  },
  graphql`
    query AutoCompleteRefetchQuery($query: String) {
      viewer {
        searchCountries(query: $query, limit: 5) {
          id
          name
        }
      }
    }
  `
);

// export type ActionType =
//   | { type: "TEXT_INPUT_CHANGE" }
//   | { type: "SUGGESTION_SELECTED" };

// const initialState = {
//   didUserInteract: false,
//   isSuggestionOpen: false
// };

// function reducer(state, action: ActionType) {
//   switch (action.type) {
//     case "TEXT_INPUT_CHANGE":
//       return state;
//     case "SUGGESTION_SELECTED":
//       return state;
//     default:
//       (action: empty);
//       return state;
//   }
// }
