import { useState } from "react";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

export function usePostPaginationControls(refetch) {
  const [config, setConfig] = useState({
    createdAt: { desc: false },
    viewsCount: { desc: true }
  });
  const [activeField, setActiveField]: [PostOrderingFields, any] = useState(
    "createdAt"
  );

  function handleActiveFieldChange(field: PostOrderingFields) {
    setActiveField(field);
    refetch(
      {
        first: 3,
        after: null,
        last: null,
        before: null,
        orderBy: { field, desc: config[field].desc }
      }
    );
  }

  function handleDirectionChange({ field, desc }) {
    setConfig({ ...config, [field]: { desc } });
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

  return {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  };
}
