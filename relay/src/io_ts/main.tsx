import * as t from "io-ts";

const SearchParams = t.partial({
  countryNameContains: t.string,
  populationGte: t.number,
  populationLte: t.number,
});

type SearchParams = t.TypeOf<typeof SearchParams>;

const result = SearchParams.decode({
  countryNameContains: "united",
  populationGte: "1",
  populationLte: "a",
});

console.log(result);
