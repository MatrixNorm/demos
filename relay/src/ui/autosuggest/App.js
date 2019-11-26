// @flow

import React, { useMemo, useRef, useReducer } from "react";
import { QueryRenderer, graphql } from "react-relay";
import { createDebounceStateMachine } from "../../utils/fsm";
import environment from "./env";

const initialState = {
  inputValue: "",
  showSuggestions: false
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_STARTED_TYPING":
      return { ...state, showSuggestions: false };
    case "USER_STOPPED_TYPING":
      return {
        ...state,
        showSuggestions: action.inputValue.trim().length > 0,
        inputValue: action.inputValue.trim()
      };
    case "CLOSE_SUGGESTIONS":
      return { ...state, showSuggestions: false };
    default:
      return state;
  }
}

export default function AutoSuggest() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputEl = useRef(null);

  const handleInputChange = useMemo(function() {
    const fsm = createDebounceStateMachine(500);
    fsm.subscribe({
      onOutput: output => {
        console.log({ type: output });
        dispatch({ type: output, inputValue: inputEl.current.value });
      }
    });
    return () => {
      fsm.send();
    };
  }, []);

  const handleSuggestionsClose = () => {
    dispatch({ type: "CLOSE_SUGGESTIONS" });
  };

  const onInputBlur = () => {
    dispatch({ type: "CLOSE_SUGGESTIONS" });
  };

  return (
    <div>
      <input
        type="text"
        ref={inputEl}
        onChange={handleInputChange}
        onBlur={onInputBlur}
      />
      {state.showSuggestions && (
        <SuggestionsContainer
          query={state.inputValue}
          limit={5}
          handleSuggestionsClose={handleSuggestionsClose}
        />
      )}
    </div>
  );
}

function SuggestionsContainer({ query, limit, handleSuggestionsClose }) {
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
        console.log(props.viewer.searchCountries);
        return (
          <ul onClick={handleSuggestionsClose}>
            {props.viewer.searchCountries.map(country => (
              <li key={country}>{country}</li>
            ))}
          </ul>
        );
      }}
    />
  );
}
