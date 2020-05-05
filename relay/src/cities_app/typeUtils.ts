export type NukeFragRef<T> = Omit<T, " $refType">;

export type NukeNulls<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// https://github.com/facebook/relay/issues/2394
const mockRefType: any = null;

export function addRefType(obj: any) {
  return { ...obj, " $refType": mockRefType };
}
