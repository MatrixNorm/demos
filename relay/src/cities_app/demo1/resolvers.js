import _ from "lodash";
import citiesTxt from "raw-loader!theapp/resources/cities.json.txt";

const cities = _.orderBy(JSON.parse(citiesTxt), ["population"], ["desc"]);
const countries = [...new Set(cities.map(i => i.country))];

function isMissing(obj) {
  return obj === null || obj === undefined || Object.entries(obj).length === 0;
}

export const serverResolvers = {
  Query: {
    viewer: () => {
      return { id: 1 };
    },
    node: (_, { id }) => {
      console.log({ id });
      return { id };
    },
    citiesPagination: (_, args) => {
      console.log(JSON.stringify(args, 2));
      let { pageSize, pageNo, searchParams } = args;
      let nodes = cities;
      if (isMissing(searchParams)) {
        nodes = nodes.slice(pageNo * pageSize, pageNo * pageSize + pageSize);
      } else {
        let {
          countryNameContains,
          populationGte,
          populationLte
        } = searchParams;
        if (countryNameContains && countryNameContains.length > 0) {
          nodes = cities.filter(city =>
            city.country.toLowerCase().includes(countryNameContains.toLowerCase())
          );
        }
        if (populationGte) {
          nodes = nodes.filter(city => city.population >= populationGte);
        }
        if (populationLte) {
          nodes = nodes.filter(city => city.population <= populationLte);
        }
        nodes = nodes.slice(pageNo * pageSize, pageNo * pageSize + pageSize);
      }
      return {
        nodes,
        pageNo,
        hasNextPage: true,
        hasPrevPage: false
      };
    },
    citiesMetadata: () => {
      return {
        populationLowerBound: 400000,
        populationUpperBound: 9000000,
        latLowerBound: 11.97,
        latUpperBound: 67.53,
        lngLowerBound: 9.47,
        lngUpperBound: 78.25
      };
    },
    countries: (_, { searchString }) => {
      return countries
        .filter(c => c.toLowerCase().includes(searchString))
        .slice(0, 5);
    }
  },
  Node: {
    __resolveType(node) {
      console.log({ node });
      return node;
    }
  },
  User: {}
};
