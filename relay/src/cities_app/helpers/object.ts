declare const __compacted__: unique symbol;
export type Compacted<T extends object> = Partial<T> & {
  [__compacted__]: true;
};

/**
 * value of `undefined` is treated as absent key
 * value of `null` is interpeted by comsuming application,
 * for this function `null` is a valid value
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

export function isTrueDelta(delta: any, base: any): boolean {
  if (!delta) return false;
  for (let key in delta) {
    // @ts-ignore
    if (delta[key] && base[key] !== delta[key]) return true;
  }
  return false;
}

export function trueDelta<T extends object>({
  delta,
  basis,
}: {
  delta: Partial<T> | null;
  basis: T;
}): Partial<T> | null {
  if (!delta) {
    return null;
  }
  const differentEntries = Object.entries(delta).filter(
    //@ts-ignore
    ([k, v]) => v && basis[k] !== v
  );
  if (differentEntries.length > 0) {
    //@ts-ignore
    return Object.fromEntries(differentEntries);
  }
  return null;
}

export function toQueryURL<T extends object>(obj: T) {
  let qp = new URLSearchParams("");
  for (let k in obj) {
    obj[k] && qp.append(k, String(obj[k]));
  }
  return qp.toString();
}
