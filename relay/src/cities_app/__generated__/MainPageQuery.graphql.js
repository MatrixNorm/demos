/**
 * @flow
 * @relayHash 134413bacc7409859dd0e5b3b568fdcd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MainPageQueryVariables = {||};
export type MainPageQueryResponse = {|
  +citiesMetadata: ?{|
    +countries: ?$ReadOnlyArray<string>,
    +population_lower_bound: number,
    +population_upper_bound: number,
    +lat_lower_bound: number,
    +lat_upper_bound: number,
    +lng_lower_bound: number,
    +lng_upper_bound: number,
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
    countries
    population_lower_bound
    population_upper_bound
    lat_lower_bound
    lat_upper_bound
    lng_lower_bound
    lng_upper_bound
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
],
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "cityFilters",
  "storageKey": null,
  "args": null,
  "concreteType": "CityFilter",
  "plural": true,
  "selections": (v2/*: any*/)
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pinnedCityFilter",
  "storageKey": null,
  "args": null,
  "concreteType": "CityFilter",
  "plural": false,
  "selections": (v2/*: any*/)
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
      (v0/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MainPageQuery",
    "argumentDefinitions": [],
    "selections": [
      (v0/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MainPageQuery",
    "id": null,
    "text": "query MainPageQuery {\n  citiesMetadata {\n    countries\n    population_lower_bound\n    population_upper_bound\n    lat_lower_bound\n    lat_upper_bound\n    lng_lower_bound\n    lng_upper_bound\n  }\n  viewer {\n    cityFilters {\n      id\n      name\n    }\n    pinnedCityFilter {\n      id\n      name\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4dd0ac8f97a5fcc1f4505196cdbb9427';
module.exports = node;
