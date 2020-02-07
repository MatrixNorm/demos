import { AppQueryResponse } from "__relay__/AppQuery.graphql";

export type UIStateType = AppQueryResponse["uiState"];
export type SearchParamsType = NonNullable<UIStateType>["citySearchParams"];
