// @flow

import React, { useState, useContext } from "react";
import { PostFeedContext } from "./PostFeedContext";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

type ConfigType = {
  [PostOrderingFields]: {| desc: boolean |}
};

const PostPaginationControls = ({ renderCallback }: any) => {
  const { refetch } = useContext(PostFeedContext);

  const [config, setConfig] = useState<ConfigType>({
    createdAt: { desc: false },
    viewsCount: { desc: true }
  });

  const [activeField, setActiveField] = useState<PostOrderingFields>(
    "createdAt"
  );

  function handleActiveFieldChange(field: PostOrderingFields) {
    setActiveField(field);
    const desc = config[field].desc;
    refetch(
      {
        first: 3,
        after: null,
        last: null,
        before: null,
        orderBy: { field, desc }
      }
    );
  }

  function handleDirectionChange(field: PostOrderingFields) {
    const newDesc = !config[field].desc;
    const newConfig = { ...config, [field]: { desc: newDesc } };
    setConfig(newConfig);
    refetch(
      {
        first: 3,
        after: null,
        last: null,
        before: null,
        orderBy: { field, desc: newDesc }
      }
    );
  }

  return renderCallback({
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  });
};

const PostPaginationControls_v1 = () => {
  const renderCallback = ({
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  }) => (
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

  return <PostPaginationControls renderCallback={renderCallback} />;
};

const PostPaginationControls_v2 = () => {
  const renderCallback = ({
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  }) => (
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

  return <PostPaginationControls renderCallback={renderCallback} />;
};

export default {
  v1: PostPaginationControls_v1,
  v2: PostPaginationControls_v2
};
