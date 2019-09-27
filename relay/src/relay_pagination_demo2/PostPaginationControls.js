// @flow

import React, { useContext } from "react";
import { PostFeedContext } from "./PostFeedContext";
import { usePostPaginationControls } from "./postPaginationControlsHook";

const PostPaginationControls_v1 = () => {
  const {
    refetch,
    posts: { orderBy }
  } = useContext(PostFeedContext);

  const {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  } = usePostPaginationControls(refetch, orderBy);

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
            onChange={e =>
              handleDirectionChange({
                field: "createdAt",
                desc: e.target.checked
              })
            }
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
            onChange={e =>
              handleDirectionChange({
                field: "viewsCount",
                desc: e.target.checked
              })
            }
          />
          desc
        </label>
      </div>
    </div>
  );
};

const PostPaginationControls_v2 = () => {
  const {
    refetch,
    posts: { orderBy }
  } = useContext(PostFeedContext);

  const {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  } = usePostPaginationControls(refetch, orderBy);
  console.log(777777777777777, orderBy);
  const Input = ({ field }) => (
    <input
      type="radio"
      value={field}
      checked={activeField === field}
      onChange={() => handleActiveFieldChange(field)}
    />
  );

  const Button = ({ field, children }) => (
    <button
      type="button"
      onClick={() =>
        activeField === field &&
        handleDirectionChange({
          field,
          desc: !config[field].desc
        })
      }
    >
      {children}
    </button>
  );

  return (
    <div className="controls">
      <div>
        <label>
          <Input field="createdAt" />
          <Button field="createdAt">
            {config["createdAt"].desc ? "Recent first" : "Oldest first"}
          </Button>
        </label>
      </div>
      <div>
        <label>
          <Input field="viewsCount" />
          <Button field="viewsCount">
            {config["viewsCount"].desc
              ? "Most popular first"
              : "Least popular first"}
          </Button>
        </label>
      </div>
    </div>
  );
};

export default {
  v1: PostPaginationControls_v1,
  v2: PostPaginationControls_v2
};
