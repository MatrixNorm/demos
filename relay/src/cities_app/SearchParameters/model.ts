import * as t from "io-ts";

const isString = (input: unknown): input is string => typeof input === "string";
const isNumber = (input: unknown): input is number => typeof input === "number";
const isEmptyObject = (input: unknown): input is {} =>
  typeof input === "object" && input !== null && Object.keys(input).length === 0;

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

const EmptyObject = new t.Type<{}>(
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

// can be derived from model
export const CitySearchParamsCoercer = t.partial({
  countryNameContains: coerceToString,
  populationGte: coerceToNumber,
  populationLte: coerceToNumber,
});

// XXX
export const CitySearchParamsShape = t.type({
  countryNameContains: nonBlankString,
  populationGte: nonNegativeNumber,
  populationLte: nonNegativeNumber,
});
export type CitySearchParamsShape = t.TypeOf<typeof CitySearchParamsShape>;

// XXX
interface CitySearchParamsBrand {
  readonly Positive: unique symbol;
}
export const CitySearchParams = t.brand(
  t.partial(CitySearchParamsShape.props),
  (x): x is t.Branded<any, CitySearchParamsBrand> => {
    const { populationGte: gte, populationLte: lte } = x;
    return gte !== undefined && lte !== undefined ? gte <= lte : true;
  },
  "SearchParams"
);
export type CitySearchParams = t.TypeOf<typeof CitySearchParams>;

export type CitySearchParamsErrors = Partial<
  {
    [P in keyof CitySearchParamsShape]: String;
  } & { _: String[] }
>;

// XXX
export type CitySearchParamsState = {
  value: CitySearchParams;
  draft: Partial<CitySearchParamsShape>;
  errors: CitySearchParamsErrors;
};

export const CitySearchParamsValidState = t.type({
  value: CitySearchParams,
  draft: EmptyObject,
  error: EmptyObject,
});

export type CitySearchParamsValidState = t.TypeOf<typeof CitySearchParamsValidState>;
