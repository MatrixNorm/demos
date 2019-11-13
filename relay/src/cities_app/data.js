import citiesJson from "raw-loader!./data/cities.json";

export default {
  Europe: euroCities.map((rec, i) => ({ id:i, name: rec[0], population: rec[1] })),
  NorthAmerica: naCities.map((rec, i) => ({ id:i, name: rec[0], population: rec[1] }))
};
