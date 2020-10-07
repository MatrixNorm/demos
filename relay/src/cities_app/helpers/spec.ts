export type ScalarValidatorResult<V> =
  | { valid: true; value: V }
  | { valid: false; value: V; error: string };

export type ScalarValidator<V> = (value: V) => ScalarValidatorResult<V>;

export type Validator<T> = {
  [P in keyof T]: ScalarValidator<T[P]>;
};

export type ValidationResult<T> = {
  [P in keyof T]: ScalarValidatorResult<T[P]>;
};

export function nonEmptyString(value: unknown): string | null {
  if (typeof value === "string") {
    let trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  return null;
}

export function positiveNumber(value: unknown): number | null {
  if (typeof value === "string") {
    let num = Number(value);
    return num && num > 0 ? num : null;
  }
  return null;
}

// export function validatePartially<T>(
//   validator: Validator<T>,
//   rawObject: unknown
// ): Compacted<T> {
//   if (typeof rawObject === "object" && rawObject !== null) {
//     let result = {};
//     for (let prop in validator) {
//       let validatorFn = validator[prop];
//       //@ts-ignore
//       result[prop] = validatorFn(rawObject[prop]);
//     }
//     return compact(result);
//   }
//   return compact(null);
// }
