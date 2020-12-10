import * as t from "io-ts";
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

const SearchParams = t.partial({
  countryNameContains: nonBlankString,
  populationGte: nonNegativeNumber,
  populationLte: nonNegativeNumber,
});
type SearchParams = t.TypeOf<typeof SearchParams>;

const SearchParams2 = new t.Type<SearchParams, SearchParams, SearchParams>(
  "SearchParams2",
  (input: unknown): input is SearchParams => true,
  (input, c) => {
    const { populationGte: gte, populationLte: lte } = input;
    if (gte !== undefined && lte !== undefined && gte > lte) {
      return t.failure(input, c, "gte > lte");
    }
    return t.success(input);
  },
  t.identity
);

const SearchParams3 = SearchParams.pipe(SearchParams2);
type SearchParams3 = t.TypeOf<typeof SearchParams3>;

let input = {
  countryNameContains: " d ",
  populationGte: 3,
  populationLte: 1,
};

pipe(
  SearchParams.decode(input),
  Either.fold(
    (errors) => {
      console.log(errors);
    },
    (x) => {
      console.log(x);
    }
  )
);

pipe(
  SearchParams2.decode(input),
  Either.fold(
    (errors) => {
      console.log(errors);
    },
    (x) => {
      console.log(x);
    }
  )
);

pipe(
  SearchParams3.decode(input),
  Either.fold(
    (errors) => {
      console.log(errors);
    },
    (x) => {
      console.log(x);
    }
  )
);
