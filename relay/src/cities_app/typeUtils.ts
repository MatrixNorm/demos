export type NukeFragRef<T> = Omit<T, " $refType">;

export type NukeNulls<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
