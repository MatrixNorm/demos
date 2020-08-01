import { NukeNulls } from "./typeUtils";

/**
 * opaque type to guarantee there is no `undefined` values in an object
 */

type __Compacted__ = "__Compacted__";
export type Compacted<T extends object> = Partial<T> & __Compacted__;

/**
 * value of `undefined` is treated as absent key
 *
 * how to treat value of `null` is upto consuming application,
 *
 */
export function compact<T extends object>(
  obj: T | Partial<T> | null | undefined
): Compacted<T> {
  if (!obj) {
    return {} as Compacted<T>;
  }
  let compacted = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
  // @ts-ignore
  return compacted as Compacted<T>;
}

export function purgeNulls<T extends object>(obj: Compacted<T>): Compacted<NukeNulls<T>> {
  let purged = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null));
  // @ts-ignore
  return purged as Compacted<NukeNulls<T>>;
}

export function merge<T extends object>(
  left: Compacted<T> | null,
  right: Compacted<T> | null
): Compacted<T>;
export function merge<T extends object>(left: T, right: Compacted<T> | null): T;
export function merge<T extends object>(
  left: Partial<T> | null,
  right: Compacted<T> | null
): Partial<T>;
export function merge(left: any, right: any): any {
  // @ts-ignore
  return { ...left, ...right };
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
