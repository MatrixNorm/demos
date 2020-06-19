type State<T> = StateIdle | StateMutPending<T> | StateMut2Queued<T>;
type StateIdle = { status: "idle"; context: {} };
type StateMutPending<T> = { status: "mut-pending"; context: { optUpd: T } };
type StateMut2Queued<T> = { status: "mut2-queued"; context: { optUpd: T; optUpd2: T } };

type Event<T> = EvEdit<T> | EvStartMut | EvClear | EvMutSucc<T> | EvMutFail;
type EvEdit<T> = {
  type: "edit";
  payload: Partial<T>;
};
type EvStartMut = { type: "start-mut" };
type EvClear = { type: "clear" };
type EvMutSucc<T> = { type: "mut-succ"; serverValue: T };
type EvMutFail = { type: "mut-fail" };

type DbType<T> = { sv: T; ed: Partial<T> };

function merge(obX: object, obY: object) {
  return { ...obX, ...obY };
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

export function transit<T extends object>(
  state: State<T>,
  event: Event<T>,
  db: DbType<T>
) {
  switch (state.status) {
    case "idle": {
      return transitFromIdle(event, db);
    }
    case "mut-pending": {
      return transiFromMutPending(event, state.context, db);
    }
    case "mut2-queued": {
      return transitFromMut2Queued(event, state.context, db);
    }
    default:
      // impossible
      throw new Error("wow, so much for impossible state");
  }
}

function transitFromIdle<T extends object>(event: Event<T>, db: DbType<T>) {
  switch (event.type) {
    case "clear": {
      return ["idle", {}, [{ "db/ed": null }]];
    }
    case "edit": {
      return ["idle", {}, [{ "db/ed": diff(merge(db.ed, event.payload), db.sv) }]];
    }
    case "start-mut": {
      if (diff(db.ed, db.sv)) {
        const optUpd = merge(db.sv, db.ed);
        return [
          "mut-pending",
          { "opt-upd": optUpd },
          [{ "db/ed": null }, { commitMutation: optUpd }],
        ];
      }
      return null;
    }
    default:
      return null;
  }
}

function transiFromMutPending<T extends object>(
  event: Event<T>,
  context: StateMutPending<T>["context"],
  db: any
) {
  switch (event.type) {
    case "clear": {
      return ["mut-pending", context, [{ "db/ed": null }]];
    }
    case "edit": {
      return [
        "mut-pending",
        context,
        [{ "db/ed": diff(merge(db.ed, event.payload), db.sv) }],
      ];
    }
    case "start-mut": {
      if (diff(db.ed, db.sv)) {
        const optUpd2 = merge(db.sv, db.ed);
        return [
          "mut2-queued",
          { ...context, "opt-upd2": optUpd2 },
          [{ "db/ed": null }, { applyUpdate: optUpd2 }],
        ];
      }
      return null;
    }
    case "mut-succ": {
      return ["idle", {}, []];
    }
    case "mut-fail": {
      return ["idle", {}, [{ "db/ed": diff(context.optUpd, db.sv) }]];
    }
    default:
      // impossible
      throw new Error("wow, so much for impossible state");
  }
}

function transitFromMut2Queued<T extends object>(
  event: Event<T>,
  context: StateMut2Queued<T>["context"],
  db: any
) {
  switch (event.type) {
    case "clear": {
      return ["mut-pending", context, [{ "db/ed": null }]];
    }
    case "edit": {
      return [
        "mut-pending",
        context,
        [{ "db/ed": diff(merge(db.ed, event.payload), db.sv) }],
      ];
    }
    case "start-mut": {
      if (diff(db.ed, db.sv)) {
        const optUpd2 = merge(db.sv, db.ed);
        return [
          "mut2-queued",
          { ...context, "opt-upd2": optUpd2 },
          [
            { "db/ed": null },
            { revertUpdate: context.optUpd2 },
            { applyUpdate: optUpd2 },
          ],
        ];
      }
      return null;
    }
    case "mut-succ": {
      if (diff(context.optUpd2, db.sv)) {
        return [
          "mut-pending",
          { "opt-upd": merge(db.sv, context.optUpd2) },
          [{ revertUpdate: context.optUpd2 }, { commitMutation: context.optUpd2 }],
        ];
      } else {
        return ["idle", {}, [{ revertUpdate: context.optUpd2 }]];
      }
    }
    case "mut-fail": {
      return ["idle", {}, [{ "db/ed": diff(context.optUpd, db.sv) }]];
    }
    default:
      // impossible
      throw new Error("wow, so much for impossible state");
  }
}
