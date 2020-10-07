export type Decoder<T> = {
  [P in keyof T]: (value: unknown) => T[P] | null;
};

export function string(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }
  return null;
}

export function number(value: unknown): number | null {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    let parsed = Number(value);
    return parsed ? parsed : null;
  } else {
    return null;
  }
}
