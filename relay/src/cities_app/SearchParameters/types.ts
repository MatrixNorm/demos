import * as spec from "../helpers/spec";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";

export type SP = NukeFragRef<SearchParameters_searchParams>;

export type SPBlank = {
  [P in keyof SP]: null;
};

type SPDenulled = NukeNulls<SP>;

export type SPDisplayed = {
  [P in keyof SPDenulled]: {
    value: NonNullable<SPDenulled[P]["value"]>;
    error: string | null;
  };
};

export type SPValues = {
  [P in keyof SPDenulled]: NonNullable<SPDenulled[P]["value"]>;
};

export type SPEditPayload = Partial<SPValues>;

export type SPEditPayloadValidated = Partial<
  {
    [P in keyof SPValues]:
      | { error: null; value: SPValues[P] }
      | { error: string; value: SPValues[P] };
  }
>;

export type Metadata = NukeFragRef<SearchParameters_metadata>;
