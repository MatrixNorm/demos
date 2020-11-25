import * as t from "io-ts";

const isString = (input: unknown): input is string => typeof input === "string";

const isNumber = (input: unknown): input is number => typeof input === "number";

const coerceToNumber = new t.Type<number, string>(
  "coerceToNumber",
  isNumber,
  (input, context) => (isNumber(input) ? t.success(input) : t.failure(input, context)),
  String
);

const nonBlankString = new t.Type<string>(
  "nonBlankString",
  isString,
  (input, context) =>
    isString(input) && input.trim().length > 0
      ? t.success(input)
      : t.failure(input, context),
  t.identity
);

const nonNegativeNumber = new t.Type<number>(
  "nonNegativeNumber",
  isNumber,
  (input, context) =>
    isNumber(input) && input >= 0 ? t.success(input) : t.failure(input, context),
  t.identity
);

// can be derived from model
export const CitySearchParamsCoercer = t.type({
  countryNameContains: t.string,
  populationGte: coerceToNumber,
  populationLte: coerceToNumber,
});

// XXX
export const CitySearchParamsShape = t.type({
  countryNameContains: t.union([nonBlankString, t.null]),
  populationGte: t.union([nonNegativeNumber, t.null]),
  populationLte: t.union([nonNegativeNumber, t.null]),
});
export type CitySearchParamsShape = t.TypeOf<typeof CitySearchParamsShape>;

// XXX
interface CitySearchParamsBrand {
  readonly Positive: unique symbol;
}
export const CitySearchParams = t.brand(
  CitySearchParamsShape,
  (x): x is t.Branded<any, CitySearchParamsBrand> => {
    const { populationGte: gte, populationLte: lte } = x;
    return gte !== null && lte !== null ? gte <= lte : true;
  },
  "SearchParams"
);
export type CitySearchParams = t.TypeOf<typeof CitySearchParams>;

type CitySearchParamsErrors = {
  [P in keyof CitySearchParamsShape]: String | null;
};

// XXX
export type CitySearchParamsState = {
  value: CitySearchParams;
  draft: CitySearchParamsShape;
  fieldErrors: CitySearchParamsErrors;
  rootErrors: String[];
};
