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
export const SearchParamsCoercer = t.type({
  countryNameContains: t.string,
  populationGte: coerceToNumber,
  populationLte: coerceToNumber,
});

// XXX
export const SearchParamsShape = t.type({
  countryNameContains: t.union([nonBlankString, t.null]),
  populationGte: t.union([nonNegativeNumber, t.null]),
  populationLte: t.union([nonNegativeNumber, t.null]),
});
export type SearchParamsShape = t.TypeOf<typeof SearchParamsShape>;

// XXX
interface SearchParamsBrand {
  readonly Positive: unique symbol;
}
export const SearchParams = t.brand(
  SearchParamsShape,
  (x): x is t.Branded<any, SearchParamsBrand> => {
    const { populationGte: gte, populationLte: lte } = x;
    return gte !== null && gte !== undefined && lte !== null && lte !== undefined
      ? gte <= lte
      : true;
  },
  "SearchParams"
);
export type SearchParams = t.TypeOf<typeof SearchParams>;

// XXX
export type SearchParamsState = {
  value: SearchParams;
  draft: SearchParamsShape;
  fieldErrors: {
    [P in keyof SearchParamsShape]: String | null;
  };
  rootErrors: String[] | null;
};
