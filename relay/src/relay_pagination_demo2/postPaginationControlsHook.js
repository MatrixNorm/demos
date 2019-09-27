// @flow

import { useState } from "react";
import type { PostOrderingFields } from "./__generated__/AppQuery.graphql";

type OrderType = {|
  field: PostOrderingFields,
  desc: boolean
|};

export function usePostPaginationControls(refetch: any, initialOrder: OrderType) {
  console.log(initialOrder)
  const [config, setConfig] = useState(
    Object.assign(
      {
        createdAt: { field: "createdAt", desc: false },
        viewsCount: { field: "viewsCount", desc: true }
      },
      { [initialOrder.field]: initialOrder }
    )
  );

  const [activeField, setActiveField]: [PostOrderingFields, any] = useState(
    initialOrder.field
  );

  function handleActiveFieldChange(field: PostOrderingFields) {
    setActiveField(field);
    refetch({
      first: 3,
      after: null,
      last: null,
      before: null,
      orderBy: { field, desc: config[field].desc }
    });
  }

  function handleDirectionChange({ field, desc }: OrderType) {
    setConfig({ ...config, [field]: { desc } });
    refetch({
      first: 3,
      after: null,
      last: null,
      before: null,
      orderBy: { field, desc }
    });
  }

  return {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  };
}
