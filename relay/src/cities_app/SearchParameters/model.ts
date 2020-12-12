import * as t from "io-ts";

type EmptyObject = { [k: string]: undefined };

const isString = (input: unknown): input is string => typeof input === "string";

const isNonBlankString = (input: unknown): input is string =>
  isString(input) && input.trim().length > 0;

const isNumber = (input: unknown): input is number => typeof input === "number";

const isNonNegativeNumber = (input: unknown): input is number =>
  isNumber(input) && input >= 0;

const isEmptyObject = (input: unknown): input is EmptyObject =>
  typeof input === "object" &&
  input !== null &&
  Object.entries(input).filter(([_, v]) => v !== undefined).length === 0;

const nonBlankString = new t.Type<string>(
  "nonBlankString",
  isNonBlankString,
  (input, context) =>
    isNonBlankString(input) ? t.success(input) : t.failure(input, context),
  t.identity
);

const nonNegativeNumber = new t.Type<number>(
  "nonNegativeNumber",
  isNonNegativeNumber,
  (input, context) =>
    isNonNegativeNumber(input) ? t.success(input) : t.failure(input, context),
  t.identity
);

const EmptyObject = new t.Type<EmptyObject>(
  "EmptyObject",
  isEmptyObject,
  (input, context) =>
    isEmptyObject(input) ? t.success(input) : t.failure(input, context),
  t.identity
);

const coerceToString = new t.Type<string | undefined, string>(
  "coerceToString",
  isString,
  (input) => (typeof input === "string" ? t.success(input) : t.success(undefined)),
  String
);

const coerceToNumber = new t.Type<number | undefined, string>(
  "coerceToNumber",
  isNumber,
  (input) => (isNumber(input) ? t.success(input) : t.success(undefined)),
  String
);

/////////
// XXX //
/////////
export type CitySearchParamsDraft = t.TypeOf<typeof CitySearchParamsDraft>;

export const CitySearchParamsDraft = t.partial({
  countryNameContains: t.union([t.string, t.null]),
  populationGte: t.union([t.number, t.null]),
  populationLte: t.union([t.number, t.null]),
});

/////////
// XXX //
/////////
export type CitySearchParams = t.TypeOf<typeof CitySearchParams__>;

export const CitySearchParams__ = t.partial({
  countryNameContains: nonBlankString,
  populationGte: nonNegativeNumber,
  populationLte: nonNegativeNumber,
});

export const CitySearchParams = CitySearchParams__.pipe(
  new t.Type<CitySearchParams, CitySearchParams, CitySearchParams>(
    "CitySearchParams",
    (input): input is CitySearchParams => CitySearchParams__.is(input),
    (input, c) => {
      const { populationGte: gte, populationLte: lte } = input;
      if (gte !== undefined && lte !== undefined && gte > lte) {
        return t.failure(input, c, "gte > lte");
      }
      return t.success(input);
    },
    t.identity
  )
);

// XXX can be derived
export const CitySearchParamsCoercer = t.partial({
  countryNameContains: coerceToString,
  populationGte: coerceToNumber,
  populationLte: coerceToNumber,
});
