import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { CitySearchParameters_metadata } from "__relay__/CitySearchParameters_metadata.graphql";
import { CitySearchParameters_state } from "__relay__/CitySearchParameters_state.graphql";

export type Metadata = NukeFragRef<CitySearchParameters_metadata>;
export type State = NukeFragRef<CitySearchParameters_state>;

type VT = NukeNulls<NonNullable<State["value"]>>;
export type Fields = {
  [P in keyof VT]: { value: VT[P]; error?: string };
};
