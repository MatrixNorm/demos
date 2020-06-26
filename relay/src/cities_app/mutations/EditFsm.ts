type StateIdle = { status: "idle"; context: {} };
type StateMutPending<T> = { status: "mut-pending"; context: { optUpd: T } };
type StateMut2Queued<T> = { status: "mut2-queued"; context: { optUpd: T; optUpd2: T } };

export type State<T> = StateIdle | StateMutPending<T> | StateMut2Queued<T>;

type EvEdit<T> = {
  type: "edit";
  payload: Partial<T>;
};
type EvStartMut = { type: "start-mut" };
type EvClear = { type: "clear" };
type EvMutSucc<T> = { type: "mut-succ"; serverValue: T };
type EvMutFail = { type: "mut-fail" };

export type Event<T> = EvEdit<T> | EvStartMut | EvClear | EvMutSucc<T> | EvMutFail;

type EffEdit<T> = { type: "db/ed"; params: Partial<T> | null };
type EffCommitMutation<T> = {
  type: "commitMutation";
  params: { optUpd: T; mutInput: Partial<T> };
};
type EffApplyUpdate<T> = { type: "applyUpdate"; params: T };
type EffRevertUpdate<T> = { type: "revertUpdate"; params: T };

export type Effect<T> =
  | EffEdit<T>
  | EffCommitMutation<T>
  | EffApplyUpdate<T>
  | EffRevertUpdate<T>;

type DbType<T> = { sv: T; ed: Partial<T> | null };
type ReturnType<T> = [State<T>, Effect<T>[]] | null;

function merge<T extends object>(obX: T, obY: T | Partial<T> | null): T {
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
): ReturnType<T> {
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

function transitFromIdle<T extends object>(
  event: Event<T>,
  db: DbType<T>
): ReturnType<T> {
  switch (event.type) {
    case "clear": {
      return [{ status: "idle", context: {} }, [{ type: "db/ed", params: null }]];
    }
    case "edit": {
      return [
        { status: "idle", context: {} },
        [{ type: "db/ed", params: diff(merge(db.ed || {}, event.payload), db.sv) }],
      ];
    }
    case "start-mut": {
      let mutInput = diff(db.ed || {}, db.sv);
      if (mutInput) {
        const optUpd = merge(db.sv, db.ed);
        return [
          { status: "mut-pending", context: { optUpd } },
          [
            { type: "db/ed", params: null },
            { type: "commitMutation", params: { optUpd, mutInput } },
          ],
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
): ReturnType<T> {
  switch (event.type) {
    case "clear": {
      return [{ status: "mut-pending", context }, [{ type: "db/ed", params: null }]];
    }
    case "edit": {
      return [
        { status: "mut-pending", context },
        [{ type: "db/ed", params: diff(merge(db.ed, event.payload), db.sv) }],
      ];
    }
    case "start-mut": {
      if (diff(db.ed, db.sv)) {
        const optUpd2 = merge(db.sv, db.ed);
        return [
          { status: "mut2-queued", context: { ...context, optUpd2 } },
          [
            { type: "db/ed", params: null },
            { type: "applyUpdate", params: optUpd2 },
          ],
        ];
      }
      return null;
    }
    case "mut-succ": {
      return [{ status: "idle", context: {} }, []];
    }
    case "mut-fail": {
      return [
        { status: "idle", context: {} },
        [{ type: "db/ed", params: diff(context.optUpd, db.sv) }],
      ];
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
): ReturnType<T> {
  switch (event.type) {
    case "clear": {
      return [{ status: "mut-pending", context }, [{ type: "db/ed", params: null }]];
    }
    case "edit": {
      return [
        { status: "mut-pending", context },
        [{ type: "db/ed", params: diff(merge(db.ed, event.payload), db.sv) }],
      ];
    }
    case "start-mut": {
      if (diff(db.ed, db.sv)) {
        const optUpd2 = merge(db.sv, db.ed);
        return [
          { status: "mut2-queued", context: { ...context, optUpd2 } },
          [
            { type: "db/ed", params: null },
            { type: "revertUpdate", params: context.optUpd2 },
            { type: "applyUpdate", params: optUpd2 },
          ],
        ];
      }
      return null;
    }
    case "mut-succ": {
      const mutInput = diff(context.optUpd2, db.sv);
      if (mutInput) {
        return [
          {
            status: "mut-pending",
            context: { optUpd: merge(db.sv, context.optUpd2) },
          },
          [
            { type: "revertUpdate", params: context.optUpd2 },
            { type: "commitMutation", params: { optUpd: context.optUpd2, mutInput } },
          ],
        ];
      } else {
        return [
          { status: "idle", context: {} },
          [{ type: "revertUpdate", params: context.optUpd2 }],
        ];
      }
    }
    case "mut-fail": {
      const optUpd = { ...context.optUpd, ...context.optUpd2 };
      const mutInput = diff(optUpd, db.sv);
      if (mutInput) {
        return [
          { status: "mut-pending", context: { optUpd } },
          [
            { type: "revertUpdate", params: context.optUpd2 },
            { type: "commitMutation", params: { optUpd, mutInput } },
          ],
        ];
      } else {
        return [
          { status: "idle", context: {} },
          [{ type: "revertUpdate", params: context.optUpd2 }],
        ];
      }
    }
    default:
      // impossible
      throw new Error("wow, so much for impossible state");
  }
}
