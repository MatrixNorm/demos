import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";
import { pipe } from "fp-ts/lib/function";
import * as Either from "fp-ts/lib/Either";

const isString = (input: unknown): input is string => typeof input === "string";

const isNumber = (input: unknown): input is number => typeof input === "number";

const coerceToNumber = new t.Type<number, string>(
  "coerceToNumber",
  isNumber,
  (input, context) => (isNumber(input) ? t.success(input) : t.failure(input, context)),
  String
);

// can be derived from model
const SearchParamsCoercer = t.type({
  countryNameContains: t.string,
  populationGte: coerceToNumber,
  populationLte: coerceToNumber,
});

const nonBlankString = new t.Type<string>(
  "nonBlankString",
  isString,
  (input, c) =>
    isString(input) && input.trim().length > 0
      ? t.success(input)
      : t.failure(input, c, "nonBlankString"),
  t.identity
);

const nonNegativeNumber = new t.Type<number>(
  "nonNegativeNumber",
  isNumber,
  (input, c) =>
    isNumber(input) && input >= 0
      ? t.success(input)
      : t.failure(input, c, "nonNegativeNumber"),
  t.identity
);

const SearchParamsShape = t.type({
  countryNameContains: nonBlankString,
  populationGte: nonNegativeNumber,
  populationLte: nonNegativeNumber,
});

type SearchParamsShape = t.TypeOf<typeof SearchParamsShape>;

interface SearchParamsBrand {
  readonly Positive: unique symbol;
}

const SearchParams = t.brand(
  SearchParamsShape,
  (x): x is t.Branded<any, SearchParamsBrand> => x.populationGte <= x.populationLte,
  "SearchParams"
);

type SearchParams = t.TypeOf<typeof SearchParams>;

pipe(
  SearchParams.decode({
    countryNameContains: "  ",
    populationGte: -1,
    populationLte: -3,
  }),
  Either.fold(
    (errors) => {
      console.log(errors);
    },
    (x) => {
      console.log(x);
    }
  )
);

// pipe(
//   SearchParams.decode({
//     countryNameContains: " f ",
//     populationGte: 3,
//     populationLte: 1,
//   }),
//   Either.fold(
//     (errors) => {
//       console.log(errors);
//     },
//     (x) => {
//       console.log(x);
//     }
//   )
// );
