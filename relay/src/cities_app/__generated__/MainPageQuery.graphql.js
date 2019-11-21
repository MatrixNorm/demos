/**
 * @flow
 * @relayHash 8a3c080ebe4e858bddfb1615223c0df1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPaginationParametersPanel_params$ref } from "./CitiesPaginationParametersPanel_params.graphql";
export type MainPageQueryVariables = {||};
export type MainPageQueryResponse = {|
  +citiesMetadata: ?{|
    +$fragmentRefs: CitiesPaginationParametersPanel_params$ref
  |},
  +viewer: ?{|
    +cityFilters: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
    |}>,
    +pinnedCityFilter: ?{|
      +id: string,
      +name: string,
    |},
  |},
|};
export type MainPageQuery = {|
  variables: MainPageQueryVariables,
  response: MainPageQueryResponse,
|};
*/


/*
query MainPageQuery {
  citiesMetadata {
    ...CitiesPaginationParametersPanel_params
  }
  viewer {
    cityFilters {
      id
      name
    }
    pinnedCityFilter {
      id
      name
    }
    id
  }
}

fragment CitiesPaginationParametersPanel_params on CitiesMetadata {
  countries
  population_lower_bound
  population_upper_bound
  lat_lower_bound
  lat_upper_bound
  lng_lower_bound
  lng_upper_bound
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
],
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "cityFilters",
  "storageKey": null,
  "args": null,
  "concreteType": "CityFilter",
  "plural": true,
  "selections": (v1/*: any*/)
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pinnedCityFilter",
  "storageKey": null,
  "args": null,
  "concreteType": "CityFilter",
  "plural": false,
  "selections": (v1/*: any*/)
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MainPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesMetadata",
        "storageKey": null,
        "args": null,
        "concreteType": "CitiesMetadata",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CitiesPaginationParametersPanel_params",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MainPageQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesMetadata",
        "storageKey": null,
        "args": null,
        "concreteType": "CitiesMetadata",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "countries",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "population_lower_bound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "population_upper_bound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lat_lower_bound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lat_upper_bound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lng_lower_bound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lng_upper_bound",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v0/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MainPageQuery",
    "id": null,
    "text": "query MainPageQuery {\n  citiesMetadata {\n    ...CitiesPaginationParametersPanel_params\n  }\n  viewer {\n    cityFilters {\n      id\n      name\n    }\n    pinnedCityFilter {\n      id\n      name\n    }\n    id\n  }\n}\n\nfragment CitiesPaginationParametersPanel_params on CitiesMetadata {\n  countries\n  population_lower_bound\n  population_upper_bound\n  lat_lower_bound\n  lat_upper_bound\n  lng_lower_bound\n  lng_upper_bound\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '461e4c0d53c8b41f9ab1e8fab2127114';
module.exports = node;
