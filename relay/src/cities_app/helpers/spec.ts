import { compact, Compacted } from "../helpers/object";

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

export type Validator<T> = {
  [P in keyof T]: (value: unknown) => T[P] | null;
};

export function validatePartially<T>(
  validator: Validator<T>,
  rawObject: unknown
): Compacted<T> {
  if (typeof rawObject === "object" && rawObject !== null) {
    let result = {};
    for (let prop in validator) {
      let validatorFn = validator[prop];
      //@ts-ignore
      result[prop] = validatorFn(rawObject[prop]);
    }
    return compact(result);
  }
  return compact(null);
}
