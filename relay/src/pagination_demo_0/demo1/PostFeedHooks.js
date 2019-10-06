// @flow

import { useReducer } from "react";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

export type LocalStateType = {
  fieldsConfig: Map<PostOrderingFields, { desc: boolean }>,
  activeField: PostOrderingFields,
  isLoading: boolean
};

export type ActionType =
  | { type: "PREV_PAGE" }
  | { type: "NEXT_PAGE" }
  | { type: "ACTIVE_FIELD_CHANGE", payload: { field: PostOrderingFields } }
  | { type: "ORDER_DIRECTION_CHANGE" }
  | { type: "LOADING_STARTED" }
  | { type: "LOADING_FINISHED" };

export function usePostFeedReducer() {
  const [state, dispatch] = useReducer<LocalStateType, ActionType>(
    reducer,
    initialLocalState
  );

  return [state, dispatch];
}

export const initialLocalState: LocalStateType = {
  fieldsConfig: new Map([
    ["createdAt", { desc: false }],
    ["viewsCount", { desc: true }]
  ]),
  activeField: "createdAt",
  isLoading: false
};

function reducer(state: LocalStateType, action: ActionType): LocalStateType {
  switch (action.type) {
    case "ACTIVE_FIELD_CHANGE": {
      let activeField = action.payload.field;
      return { ...state, activeField };
    }
    case "ORDER_DIRECTION_CHANGE": {
      let { fieldsConfig, activeField } = state;
      let prev = fieldsConfig.get(activeField) || { desc: false };
      let next = { ...prev, desc: !prev.desc };
      let newFieldsConfig = new Map(fieldsConfig);
      newFieldsConfig.set(activeField, next);
      return { ...state, fieldsConfig: newFieldsConfig };
    }
    case "LOADING_STARTED":
      return { ...state, isLoading: true };
    case "LOADING_FINISHED":
      return { ...state, isLoading: false };
    case "PREV_PAGE":
    case "NEXT_PAGE":
      return state;
    default:
      (action: empty);
      return state;
  }
}
