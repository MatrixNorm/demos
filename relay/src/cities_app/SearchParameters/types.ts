import * as t from "io-ts";
import * as model from "./model";
import { NukeFragRef, NukeNulls, Nullify } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParamsState } from "__relay__/SearchParameters_searchParamsState.graphql";

export type SearchParams = t.TypeOf<typeof model.SearchParamsShape>;

export type SearchParamsState = {
  value: SearchParams;
  draft: SearchParams;
  fieldErrors: {
    [P in keyof SearchParams]: String | null;
  };
  rootErrors: String[] | null;
};
