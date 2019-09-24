// @flow

import React from "react";
import { usePostPaginationControls } from "./postPaginationControlsHook";

const PostPaginationControls_v1 = () => {
  const {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  } = usePostPaginationControls();

  return (
    <div className="controls">
      <div>
        <label>
          <input
            type="radio"
            value="createdAt"
            checked={activeField === "createdAt"}
            onChange={() => handleActiveFieldChange("createdAt")}
          />
          {config["createdAt"].desc ? "Recent first" : "Oldest first"}
        </label>
        <label>
          <input
            type="checkbox"
            checked={config["createdAt"].desc}
            disabled={activeField !== "createdAt"}
            onChange={e => handleDirectionChange(e, "createdAt")}
          />
          desc
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="viewsCount"
            checked={activeField === "viewsCount"}
            onChange={() => handleActiveFieldChange("viewsCount")}
          />
          {config["viewsCount"].desc
            ? "Most popular first"
            : "Least popular first"}
        </label>
        <label>
          <input
            type="checkbox"
            checked={config["viewsCount"].desc}
            disabled={activeField !== "viewsCount"}
            onChange={e => handleDirectionChange(e, "viewsCount")}
          />
          desc
        </label>
      </div>
    </div>
  );
};

const PostPaginationControls_v2 = () => {
  const {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  } = usePostPaginationControls();

  return (
    <div className="controls">
      <div>
        <label>
          <input
            type="radio"
            value="createdAt"
            checked={activeField === "createdAt"}
            onChange={() => handleActiveFieldChange("createdAt")}
          />
          By creation date
        </label>
        <label>
          <input
            type="checkbox"
            checked={config["createdAt"].desc}
            disabled={activeField !== "createdAt"}
            onChange={e => handleDirectionChange(e, "createdAt")}
          />
          desc
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="viewsCount"
            checked={activeField === "viewsCount"}
            onChange={() => handleActiveFieldChange("viewsCount")}
          />
          By views count
        </label>
        <label>
          <input
            type="checkbox"
            checked={config["viewsCount"].desc}
            disabled={activeField !== "viewsCount"}
            onChange={e => handleDirectionChange(e, "viewsCount")}
          />
          desc
        </label>
      </div>
    </div>
  );
};

export default {
  v1: PostPaginationControls_v1,
  v2: PostPaginationControls_v2
};
