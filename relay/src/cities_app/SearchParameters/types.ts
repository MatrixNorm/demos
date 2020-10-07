import * as spec from "../helpers/spec";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";

export type SearchParameters = NukeFragRef<SearchParameters_searchParams>;
export type SearchParametersDenulled = NukeNulls<
  NukeFragRef<SearchParameters_searchParams>
>;
export type SearchParametersForDisplay = {
  [P in keyof SearchParametersDenulled]: Pick<
    SearchParametersDenulled[P],
    "value" | "error"
  >;
};
export type SearchParametersOnlyValues = {
  [P in keyof SearchParametersDenulled]: SearchParametersDenulled[P]["value"];
};

export type SearchParametersEditPayload = Partial<
  {
    [P in keyof SearchParametersOnlyValues]: unknown;
  }
>;

export type SearchParametersValidator = spec.Validator<SearchParametersOnlyValues>;
export type SearchParametersValidatorResult = spec.ValidationResult<SearchParametersOnlyValues>;

export type Metadata = NukeFragRef<SearchParameters_metadata>;
