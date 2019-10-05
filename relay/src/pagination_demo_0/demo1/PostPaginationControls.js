// @flow

import React, { useContext } from "react";
import { PostFeedContext } from "./PostFeedContext";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

export default function PostPaginationControls() {
  const { state, dispatch } = useContext(PostFeedContext);
  const { config, activeField } = state;
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
      {Object.entries(config).map(([field, { desc }]) => {
        return (
          <div key={field}>
            <label>
              <input
                type="radio"
                value={field}
                checked={activeField === field}
                onChange={() => handleActiveFieldChange(field)}
              />
              {labelFn(field)}
            </label>
            <label>
              <input
                type="checkbox"
                checked={desc}
                disabled={activeField !== field}
                onChange={e => handleOrderDirectionChange(e, "createdAt")}
              />
              desc
            </label>
          </div>
        );
      })}
    </div>
  );
}
