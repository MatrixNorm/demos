/**
 *
 * @param delta
 * - has the same keys as `base` or less
 * @param base
 */
export function isTrueDelta(delta: any, base: any): boolean {
  if (!delta) return false;
  for (let key in delta) {
    // @ts-ignore
    if (delta[key] && base[key] !== delta[key]) return true;
  }
  return false;
}

/**
 *
 * @param delta
 * - has the same keys as `base` or less
 * @param base
 */

export function trueDelta<T extends object>(
  delta: Partial<T> | null,
  base: T
): Partial<T> | null {
  if (!delta) {
    return null;
  }
  const differentEntries = Object.entries(delta).filter(
    //@ts-ignore
    ([k, v]) => v && base[k] !== v
  );
  if (differentEntries.length > 0) {
    //@ts-ignore
    return Object.fromEntries(differentEntries);
  }
  return null;
}
