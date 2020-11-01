import { NukeNulls } from "./typeUtils";

export function objKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function objSubset<T, U extends keyof T>(obj: T, subset: U[]): Pick<T, U> {
  let result = {} as Pick<T, U>;
  for (let prop of subset) {
    result[prop] = obj[prop];
  }
  return result;
}

/**
 * "opaque" type to guarantee there is no `undefined`
 * and `null` values in an object
 */

declare const __compacted__: unique symbol;
export type Compacted<T> = {
  readonly [__compacted__]: true;
  readonly data: Partial<NukeNulls<T>>;
};

/**
 * values of `undefined` and `null` are treated as absent value
 *
 */
export function compact<T>(obj: Partial<T> | null | undefined): Compacted<T> {
  if (!obj) {
    return { [__compacted__]: true, data: {} };
  }
  let compacted = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );
  // @ts-ignore
  return { [__compacted__]: true, data: compacted };
}

export function merge<T extends object>(
  left: Compacted<T>,
  right: Compacted<T>
): Compacted<T> {
  return { [__compacted__]: true, data: { ...left.data, ...right.data } };
}

/**
 * delta = {x:1, y:2}
 * basis = {x:7, y:2, z:9}
 * trueDelta({delta, basis}) === {x:1}
 *
 */
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

/**
 * delta = {x:1, y:2}
 * basis = {x:7, y:2, z:9}
 * isTrueDelta({delta, basis}) === true
 *
 * delta = {x:1, y:2}
 * basis = {x:1, y:2, z:9}
 * isTrueDelta({delta, basis}) === false
 *
 */
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

/**
 * objects shallow equality test
 *
 */
export function shallowEqual<T extends object>(
  x: T | Partial<T>,
  y: T | Partial<T>
): boolean {
  for (let key in x) {
    if (x[key] !== y[key]) return false;
  }
  for (let key in y) {
    if (x[key] !== y[key]) return false;
  }
  return true;
}

export function toQueryURL<T extends object>(obj: T) {
  let qp = new URLSearchParams("");
  for (let k in obj) {
    obj[k] && qp.append(k, String(obj[k]));
  }
  return qp.toString();
}
