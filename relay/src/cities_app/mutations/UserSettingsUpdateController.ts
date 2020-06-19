import * as relay from "react-relay";
import { transit, Event as EventType, State as FsmState } from "./EditFsm";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";

type UserSettings = UserSettings_user["settings"];

const fsmStateAtom: FsmState<UserSettings>[] = [{ status: "idle", context: {} }];

function getEditDelta() {}

function getServerValue() {}

export function handleEvent<UserSettings>(event: EventType<UserSettings>) {
  const db = {
    sv: getServerValue(),
    ed: getEditDelta(),
  };
  const [nextState, nextContext, effects] = transit(fsmStateAtom[0], event, db);
  if (nextState) {
    fsmStateAtom[0] = nextState;
  }
  contextAtom[0] = nextContext;
  processEffects(effects);
}

function processEffects(effects: any) {
  for (let eff of effects) {
    if ("db/ed" in eff) {
      writeEditDeltaToDb(eff["db/ed"]);
      continue;
    }
    if ("commitMutation" in eff) {
      commitOptimisticMutation(eff["commitMutation"]);
      continue;
    }
    if ("applyUpdate" in eff) {
      applyOptimisticUpdate(eff["applyUpdate"]);
      continue;
    }
    if ("revertUpdate" in eff) {
      revertOptimisticUpdate(eff["revertUpdate"]);
      continue;
    }
  }
}

function writeEditDeltaToDb(editDelta) {}
function commitOptimisticMutation(optUpd) {}
function applyOptimisticUpdate(optUpd) {}
function revertOptimisticUpdate(optUpdI) {}
