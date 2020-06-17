
function merge(obX: object, obY: object) {
  return { ...obX, ...obY }
}

function diff(possibleDiff: object, base: object) {
  if (possibleDiff === null) {
    return null;
  }
  const differentEntries = Object.entries(possibleDiff).filter(
    //@ts-ignore
    ([k, v]) => base[k] !== v
  );
  if (differentEntries.length > 0) {
    //@ts-ignore
    return Object.fromEntries(differentEntries);
  }
  return null;
}

type FsmState = "idle" | "mut-pending" | "mut2-queued"

function transit(fsmState, event, context, db) {
  switch (fsmState) {
    case "idle": {
      return transitFromIdle(event, db);
    }
    case "mut-pending": {
      return transiFromMutPending(event, context, db);
    }
    case "mut2-queued": {
      return //transitFromMut2Queued(state, event, editDelta);
    }
    default:
      // impossible
      throw new Error("impossible state is in fact possible");
  }
}

function transitFromIdle(event, db) {
  switch (event.type) {
    case "clear": {
      return [
        "idle",
        {},
        [{ "db/ed": null }]
      ]
    }
    case "edit": {
      return [
        "idle",
        {},
        [{ "db/ed": diff(merge(db.ed, event.payload), db.sv) }]
      ]
    }
    case "start-mut": {
      if (diff(db.ed, db.sv)) {
        const optUpd = merge(db.sv, db.ed)
        return [
          "mut-pending",
          { "opt-upd": optUpd },
          [{ "db/ed": null }, { "commitMutation": optUpd }]
        ]
      }
      return null
    }
    default:
      return null
  }
}

function transiFromMutPending(event, context, db) {
  switch (event.type) {
    case "clear": {
      return [
        "mut-pending",
        context,
        [{ "db/ed": null }]
      ]
    }
    case "edit": {
      return [
        "mut-pending",
        context,
        [{ "db/ed": diff(merge(db.ed, event.payload), db.sv) }]
      ]
    }
    case "start-mut": {
      if (diff(db.ed, db.sv)) {
        const optUpd2 = merge(db.sv, db.ed)
        return [
          "mut2-queued",
          { ...context, "opt-upd2": optUpd2 },
          [{ "db/ed": null }, { "applyUpdate": optUpd2 }]
        ]
      }
      return null
    }
    default:
      return null
  }
}