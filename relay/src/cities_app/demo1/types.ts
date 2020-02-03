import { AppQueryResponse } from "__relay__/AppQuery.graphql";

export type UIStateT = AppQueryResponse["uiState"];
export type SearchParamsT = NonNullable<
  NonNullable<UIStateT>["citySearchParams"]
>;
