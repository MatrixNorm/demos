import * as t from "io-ts";

const MaybeString = t.union([t.string, t.null]);

const StringFieldState = t.type({
  value: MaybeString,
  draft: MaybeString,
  error: MaybeString,
});

const IntegerFieldState = t.type({
  value: t.union([t.Int, t.null]),
  draft: t.union([t.Int, t.null]),
  error: MaybeString,
});

const SearchParams = t.type({
  countryNameContains: t.union([StringFieldState, t.null]),
  populationGte: t.union([IntegerFieldState, t.null]),
  populationLte: t.union([IntegerFieldState, t.null]),
});

type SearchParams = t.TypeOf<typeof SearchParams>;
