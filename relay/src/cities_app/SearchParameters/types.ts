import { NukeFragRef, NukeNulls, Nullify } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";

export type SP = NukeFragRef<SearchParameters_searchParams>;

export type SPBlank = {
  [P in keyof SP]: null;
};

type SPDenulled = NukeNulls<SP>;

export type SPNoError = {
  [P in keyof SPDenulled]: {
    value: SPDenulled[P]["value"];
    draft: SPDenulled[P]["draft"] extends null
      ? null
      : SPDenulled[P]["draft"] & { error: null };
  } | null;
};

export type SPDisplayed = {
  [P in keyof SPDenulled]: {
    value: NonNullable<SPDenulled[P]["value"]>;
    error: string | null;
  };
};

export type SPValues = {
  [P in keyof SPDenulled]: NonNullable<SPDenulled[P]["value"]>;
};

export type SPEditDelta = Partial<Nullify<SPValues>>;

export type SPEditDeltaValidated = Partial<
  {
    [P in keyof SPValues]: { error: string | null; value: SPValues[P] } | null;
  }
>;

export type SPValidator = {
  [P in keyof SPValues]: (value: SPValues[P]) => string | null;
};

export type Metadata = NukeFragRef<SearchParameters_metadata>;
