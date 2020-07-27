/**
 * opaque type to guarantee there is no `undefined` values in an object
 */

declare const __compacted__: unique symbol;
export type Compacted<T extends object> = Partial<T> & {
  [__compacted__]: true;
};

/**
 * value of `undefined` is treated as absent key
 *
 * how to treat value of `null` is upto consuming application,
 *
 */
export function compactObject<T extends object>(
  obj: T | Partial<T> | null | undefined
): Compacted<T> {
  if (!obj) {
    return {} as Compacted<T>;
  }
  let compacted = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
  return compacted as Compacted<T>;
}

export function trueDelta<T extends object>({
  delta,
  basis,
}: {
  delta: Compacted<T> | null;
  basis: T;
}): Compacted<T> | null {
  if (!delta) {
    return null;
  }
  const differentEntries = Object.entries(delta).filter(
    //@ts-ignore
    ([k, v]) => basis[k] !== v
  );
  if (differentEntries.length > 0) {
    //@ts-ignore
    return Object.fromEntries(differentEntries);
  }
  return null;
}

export function isTrueDelta<T extends object>({
  delta,
  basis,
}: {
  delta: Compacted<T> | null;
  basis: T;
}): boolean {
  if (!delta) return false;
  for (let key in delta) {
    // @ts-ignore
    if (basis[key] !== delta[key]) return true;
  }
  return false;
}

export function toQueryURL<T extends object>(obj: T) {
  let qp = new URLSearchParams("");
  for (let k in obj) {
    obj[k] && qp.append(k, String(obj[k]));
  }
  return qp.toString();
}
