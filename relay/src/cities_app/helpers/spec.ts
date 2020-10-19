export type ScalarValidatorResult<V> =
  | { value: V; error: null }
  | { value: unknown; error: string };

export type ScalarValidator<V> = (value: unknown) => ScalarValidatorResult<V>;

export type Validator<T> = {
  [P in keyof T]: ScalarValidator<T[P]>;
};

export type ValidationResult<T> = {
  [P in keyof T]: ScalarValidatorResult<T[P]>;
};

export function validatePartially<T>(
  validator: Validator<T>,
  data: Partial<T>
): Partial<ValidationResult<T>> {
  let result = {};
  for (let prop in data) {
    let scalarValidator = validator[prop];
    //@ts-ignore
    result[prop] = scalarValidator(data[prop]);
  }
  return result;
}
