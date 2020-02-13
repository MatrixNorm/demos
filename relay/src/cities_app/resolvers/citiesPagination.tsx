import * as t from "../types.codegen";

export default (
  cities: t.City[],
  args: t.QueryCitiesPaginationArgs,
  fallbackPageSize: number
): t.CitiesPagination => {
  let pageSize = args.pageSize || fallbackPageSize;
  let { after, before, searchParams } = args;
  let predicates: ((city: t.City) => boolean)[] = [];

  if (searchParams) {
    if (searchParams.countryNameContains) {
      let { countryNameContains } = searchParams;
      predicates.push((city: t.City) =>
        city.country.toLowerCase().includes(countryNameContains.toLowerCase())
      );
    }
    if (searchParams.populationGte) {
      let { populationGte } = searchParams;
      predicates.push((city: t.City) => city.population >= populationGte);
    }
    if (searchParams.populationLte) {
      let { populationLte } = searchParams;
      predicates.push((city: t.City) => city.population <= populationLte);
    }
  }

  let result = [];
  let hasNext = null;
  let hasPrev = null;

  if (before) {
    // getting prev page
    let endIndex = cities.findIndex(city => city.id === before);
    if (endIndex < 0) {
      throw new Error("Bad cursor");
    }
    for (let i = endIndex - 1; i >= 0; i--) {
      let city = cities[i];
      if (predicates.map(p => p(city)).every(Boolean)) {
        result.push(city);
      }
      // adding extra one node to calculate hasPrev
      if (result.length > pageSize) {
        break;
      }
    }
    result.reverse();
    hasNext = true;
    hasPrev = result.length > pageSize;
    // remove extra node frmo the front
    result = result.slice(-pageSize);
  } else {
    // getting next page
    let startIndex = after ? cities.findIndex(city => city.id === after) : 0;
    if (startIndex < 0) {
      throw new Error("Bad cursor");
    }
    for (
      let i = startIndex === 0 ? 0 : startIndex + 1;
      i < cities.length;
      i++
    ) {
      let city = cities[i];
      if (predicates.map(p => p(city)).every(Boolean)) {
        result.push(city);
      }
      // adding extra one node to calculate hasNext
      if (result.length > pageSize) {
        break;
      }
    }
    hasNext = result.length > pageSize;
    hasPrev = after !== null;
    // remove extra node frmo the end
    result = result.slice(0, pageSize);
  }
  return {
    nodes: result,
    hasNext,
    hasPrev
  };
};
