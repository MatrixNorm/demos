import { NukeFragRef, NukeNulls, Nullify } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { keyof } from "io-ts";

export type SP = NukeFragRef<SearchParameters_searchParams>;

export type FieldState<T> =
  | null
  | { value: T | null; draft: null }
  | { value: T | null; draft: T; error: string | null };

export type SpState = {
  [P in keyof SP]: FieldState<NonNullable<NonNullable<SP[P]>["value"]>>;
};

export type SpStateBlank = {
  [P in keyof SpState]: null;
};

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
