// @flow

import React, { useReducer } from "react";
import { QueryRenderer, graphql } from "react-relay";
import environment from "./env";

const initialState = {
  inputValue: "",
  isSuggestionsOpen: false
};

function reducer(state, action) {
  switch (action.type) {
    case "INPUT_VALUE_CHANGE":
      return state;
    default:
      return state;
  }
}

export default function AutoSuggest() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleInputChange(evt) {
    dispatch({ type: "INPUT_VALUE_CHANGE", value: evt.target.value });
  }

  return (
    <div>
      <TextInput value={state.inputValue} onChange={handleInputChange} />
      {state.isSuggestionsOpen && (
        <SuggestionsContainer props={{ query: state.inputValue, limit: 5 }} />
      )}
    </div>
  );
}

function TextInput(value, onChange) {
  return <input type="text" value={value} onChange={onChange} />;
}

function SuggestionsContainer({ query, limit }) {
  return (
    <QueryRenderer
      query={graphql`
        query AppQuery($query: String!, $limit: Int!) {
          viewer {
            searchCountries(query: $query, limit: $limit)
          }
        }
      `}
      environment={environment}
      variables={{ query, limit }}
      render={({ error, props }) => {
        if (error) throw error;
        if (!props) return <h3>loading...</h3>;
        return <div>Suggestions</div>;
      }}
    />
  );
}
