// @flow

import React, { useContext } from "react";
import { PostFeedContext, type ContextValueType } from "./PostFeedContext";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

export default function PostPaginationControls() {
  const { state, dispatch } = useContext<ContextValueType>(PostFeedContext);
  const { fieldsConfig, activeField } = state;
  const labelFn = {
    createdAt: desc => (desc ? "Recent first" : "Oldest first"),
    viewsCount: desc => (desc ? "Most popular first" : "Least popular first")
  };

  function handleActiveFieldChange(field: PostOrderingFields) {
    dispatch({
      type: "ACTIVE_FIELD_CHANGE",
      payload: { field }
    });
  }

  function handleOrderDirectionChange() {
    dispatch({
      type: "ORDER_DIRECTION_CHANGE"
    });
  }

  return (
    <div className="controls">
      {Array.from(fieldsConfig).map(([field, { desc }]) => {
        return (
          <div key={field}>
            <label>
              <input
                type="radio"
                value={field}
                checked={activeField === field}
                onChange={() => handleActiveFieldChange(field)}
              />
              {labelFn[field](desc)}
            </label>
            <label>
              <input
                type="checkbox"
                checked={desc}
                disabled={activeField !== field}
                onChange={handleOrderDirectionChange}
              />
              desc
            </label>
          </div>
        );
      })}
    </div>
  );
}
