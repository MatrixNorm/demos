// @flow
/* globals $ElementType */

import { useReducer } from "react";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

type EnumMap<K: string, V, O: Object = *> = O & { [K]: V & $ElementType<O, K> };

const fieldsConfig: EnumMap<PostOrderingFields, {| desc: true |}> = {
  createdAt: { desc: true },
  viewsCount: { desc: true }
};

//export type FieldsConfigKeysType = $Keys<typeof fieldsConfig>;

export type LocalStateType = {
  fieldsConfig: EnumMap<PostOrderingFields, {| desc: true |}>,
  activeField: PostOrderingFields,
  isLoading: boolean
};

export const initialLocalState: LocalStateType = {
  fieldsConfig,
  activeField: "createdAt",
  isLoading: false
};

export type PostOrdering = {
  field: PostOrderingFields,
  desc: boolean
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

function reducer(state: LocalStateType, action: ActionType): LocalStateType {
  switch (action.type) {
    case "ACTIVE_FIELD_CHANGE": {
      let activeField = action.payload.field;
      return { ...state, activeField };
    }
    case "ORDER_DIRECTION_CHANGE": {
      let { fieldsConfig, activeField } = state;
      let prevDesc = fieldsConfig[activeField].desc;
      const newFieldsConfig = { ...fieldsConfig, [activeField]: {desc: !prevDesc} };
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
