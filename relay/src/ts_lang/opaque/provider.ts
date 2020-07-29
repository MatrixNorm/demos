/**
 * opaque type to guarantee there is no `undefined` values in an object
 */

declare const __compacted__: unique symbol;
export type Compacted<T extends object> = Partial<T> & {
  readonly [__compacted__]: true;
};

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
  return compacted as Compacted<T>;
}
