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
export function compactObject<T extends object>(
  obj: Partial<T> | null | undefined
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

export function merge<T extends object>(
  left: Compacted<T>,
  right: Compacted<T>
): Compacted<T>;
export function merge<T extends object>(
  left: Partial<T>,
  right: Compacted<T>
): Partial<T>;
export function merge(left: any, right: any): any {
  // @ts-ignore
  return { ...left, ...right };
}
