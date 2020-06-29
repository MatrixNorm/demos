type EvEdit<T> = {
  type: "edit";
  payload: Partial<T>;
};
type EvSubmit = { type: "submit" };
type EvClear = { type: "clear" };
type EvResolved = { type: "resolved" };
type EvRejected = { type: "rejected" };

export type Event<T extends object> =
  | EvEdit<T>
  | EvSubmit
  | EvClear
  | EvResolved
  | EvRejected;

type StateIdle<T> = { type: "idle"; context: { sv: T; od: null; ed: Partial<T> | null } };
type StateActive<T> = {
  type: "active";
  context: { sv: T; od: Partial<T>; ed: Partial<T> | null };
};

export type State<T extends object> = StateIdle<T> | StateActive<T>;

function trueDelta<T extends object>(
  delta: Partial<T> | null,
  base: T
): Partial<T> | null {
  if (delta === null) {
    return null;
  }
  const differentEntries = Object.entries(delta).filter(
    //@ts-ignore
    ([k, v]) => base[k] !== v
  );
  if (differentEntries.length > 0) {
    //@ts-ignore
    return Object.fromEntries(differentEntries);
  }
  return null;
}

export function transit<T extends object>(state: State<T>, event: Event<T>): any {
  switch (state.type) {
    case "idle": {
      return transitFromIdle(event, state.context);
    }
    case "active": {
      return transitFromActive(event, state.context);
    }
    default:
      // impossible
      // XXX typescript ???
      throw new Error("wow, so much for impossible state");
  }
}

function transitFromIdle<T extends object>(
  event: Event<T>,
  context: StateIdle<T>["context"]
) {
  const { sv, ed } = context;
  switch (event.type) {
    case "clear": {
      return { status: "idle", context: { ...context, ed: null } };
    }
    case "edit": {
      return {
        status: "idle",
        context: { ...context, ed: trueDelta({ ...ed, ...event.payload }, sv) },
      };
    }
    case "submit": {
      let mutInput = trueDelta(ed, sv);
      if (mutInput) {
        return [
          { status: "active", context: { ...context, od: mutInput, ed: null } },
          [{ type: "commitMutation", params: { mutInput } }],
        ];
      }
      return { status: "idle", context: { ...context, ed: null } };
    }
    default:
      // unreachable
      return { status: "idle", context };
  }
}

function transitFromActive<T extends object>(
  event: Event<T>,
  context: StateActive<T>["context"]
) {
  const { sv, ed, od } = context;
  switch (event.type) {
    case "clear": {
      return { status: "idle", context: { ...context, ed: null } };
    }
    case "edit": {
      return {
        status: "idle",
        context: {
          ...context,
          ed: trueDelta({ ...ed, ...event.payload }, { ...sv, ...od }),
        },
      };
    }
    case "submit": {
      let mutInput = trueDelta(ed, { ...sv, ...od });
      if (mutInput) {
        return { status: "active", context: { ...context, od: mutInput, ed: null } };
      }
      return { status: "active", context: { ...context, ed: null } };
    }
    case "resolved":
    case "rejected": {
      let mutInput = trueDelta(od, sv);
      if (mutInput) {
        return [{ status: "active", context: { ...context, od: mutInput } }];
      }
      return { status: "idle", context: { ...context } };
    }
    default:
      // unreachable
      return { status: "idle", context };
  }
}
