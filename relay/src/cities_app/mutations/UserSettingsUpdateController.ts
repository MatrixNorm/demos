import { transit } from "./EditFsm";
import * as relay from "react-relay";

const contextAtom = [{}];
const fsmStateAtom = ["idle"];

function getEditDelta() {}

function getServerValue() {}

export function handleEvent(event) {
  const db = {
    sv: getServerValue(),
    ed: getEditDelta(),
  };
  const [nextState, nextContext, effects] = transit(
    fsmStateAtom[0],
    event,
    contextAtom[0],
    db
  );
  if (nextState) {
    fsmStateAtom[0] = nextState;
  }
  contextAtom[0] = nextContext;
  processEffects(effects);
}

function processEffects(effects) {
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
