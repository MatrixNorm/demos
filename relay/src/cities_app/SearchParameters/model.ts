import * as t from "io-ts";

type EmptyObject = { [k: string]: undefined };

const isString = (input: unknown): input is string => typeof input === "string";
const isNumber = (input: unknown): input is number => typeof input === "number";
const isEmptyObject = (input: unknown): input is EmptyObject =>
  typeof input === "object" &&
  input !== null &&
  Object.entries(input).filter(([_, v]) => v !== undefined).length === 0;

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

// XXX can be derived from model
export const CitySearchParamsCoercer = t.partial({
  countryNameContains: coerceToString,
  populationGte: coerceToNumber,
  populationLte: coerceToNumber,
});

export const CitySearchParams = t.partial({
  countryNameContains: nonBlankString,
  populationGte: nonNegativeNumber,
  populationLte: nonNegativeNumber,
});

export type CitySearchParams = t.TypeOf<typeof CitySearchParams>;

export const CitySearchParamsRefined = CitySearchParams.pipe(
  new t.Type<CitySearchParams, CitySearchParams, CitySearchParams>(
    "CitySearchParamsRefined",
    (input): input is CitySearchParams => true,
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

/////////
// XXX //
/////////

// export const CitySearchParamsErrors = t.partial({
//   countryNameContains: nonBlankString,
//   populationGte: nonBlankString,
//   populationLte: nonBlankString,
//   _: t.array(nonBlankString),
// });
// export type CitySearchParamsErrors = t.TypeOf<typeof CitySearchParamsErrors>;

// interface CitySearchParamsStateBrand {
//   readonly citySearchParamsState: unique symbol;
// }
// export const CitySearchParamsState = t.brand(
//   t.type({
//     value: CitySearchParams,
//     draft: t.partial(CitySearchParamsShape.props),
//     errors: CitySearchParamsErrors,
//   }),
//   (x): x is t.Branded<any, CitySearchParamsStateBrand> => {
//     const { populationGte: gte, populationLte: lte } = x;
//     return gte !== undefined && lte !== undefined ? gte <= lte : true;
//   },
//   "CitySearchParamsState"
// );

export type CitySearchParamsErrors = Partial<
  {
    [P in keyof CitySearchParams]: string;
  } & { _: string[] }
>;

export type CitySearchParamsState = {
  value: CitySearchParams;
  draft: CitySearchParams;
  errors: CitySearchParamsErrors;
};

export const CitySearchParamsValidState = t.type({
  value: CitySearchParams,
  draft: EmptyObject,
  errors: EmptyObject,
});
export type CitySearchParamsValidState = t.TypeOf<typeof CitySearchParamsValidState>;

export const CitySearchParamsValidDraftState = t.type({
  value: CitySearchParams,
  draft: EmptyObject,
  errors: EmptyObject,
});
export type CitySearchParamsValidDraftState = t.TypeOf<
  typeof CitySearchParamsValidDraftState
>;
