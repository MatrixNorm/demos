import { AppQueryResponse } from "./__generated__/AppQuery.graphql";

export type UIState = AppQueryResponse["uiState"];
export type SearchParams = UIState["citySearchParams"];