import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { RequireAtLeastOne } from "../helpers/typeUtils";

type UserSettingsType = UserSettings_user["settings"];

type MutZero = {
  status: "idle";
};
type MutOne = {
  status: "mut";
  mut: Partial<UserSettingsType>; // active mutation delta
};
type MutTwo = {
  status: "mut2";
  mut: Partial<UserSettingsType>;
  mut2: Partial<UserSettingsType>; // queued mutation delta
};

type MutState = MutZero | MutOne | MutTwo;
type Edited = Partial<UserSettingsType>;

type StateZeroClean = [MutZero, null];
type StateZeroDirty = [MutZero, Edited];
type StateOneClean = [MutOne, null];
type StateOneDirty = [MutOne, Edited];
type StateTwoClean = [MutTwo, null];
type StateTwoDirty = [MutTwo, Edited];

type State =
  | StateZeroClean
  | StateZeroDirty
  | StateOneClean
  | StateOneDirty
  | StateTwoClean
  | StateTwoDirty;

type Event =
  | { type: "edit"; fieldName: keyof UserSettingsType; value: any }
  | { type: "submit" }
  | { type: "cancel" }
  | { type: "mutSucc"; response: UserSettingsType }
  | { type: "mutFail" };

type EventEdit = {
  type: "edit";
  payload: Partial<UserSettingsType>;
};
type EventSubmit = { type: "submit" };

type X = (
  state: StateZeroClean,
  event: EventEdit
) => StateZeroClean | StateZeroDirty;

function reduce(server: UserSettingsType, state: State, event: Event) {
  const [mut, edited] = state;
  if (mut.status === "idle" && edited === null) {
    if (event.type === 'edit') {
      return 
    }
  }
}
