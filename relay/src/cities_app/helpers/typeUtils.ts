export type NukeFragRef<T> = T extends object
  ? {
      [P in Exclude<keyof T, " $fragmentRefs" | " $refType">]: NukeFragRef<T[P]>;
    }
  : T;

export type NukeNulls<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Nullify<T> = {
  [P in keyof T]: T[P] | null;
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// https://github.com/facebook/relay/issues/2394
const mockRefType: any = null;

export function addRefType(obj: any) {
  return { ...obj, " $refType": mockRefType };
}

// WTF
// https://stackoverflow.com/a/49725198
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
