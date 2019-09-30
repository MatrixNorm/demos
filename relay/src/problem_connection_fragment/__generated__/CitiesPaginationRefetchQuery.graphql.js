/**
 * @flow
 * @relayHash f322f21c374c5635ce6be5bb24177c86
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPagination_cities$ref } from "./CitiesPagination_cities.graphql";
export type CitiesPaginationRefetchQueryVariables = {|
  first?: ?number,
  after?: ?string,
|};
export type CitiesPaginationRefetchQueryResponse = {|
  +$fragmentRefs: CitiesPagination_cities$ref
|};
export type CitiesPaginationRefetchQuery = {|
  variables: CitiesPaginationRefetchQueryVariables,
  response: CitiesPaginationRefetchQueryResponse,
|};
*/


/*
query CitiesPaginationRefetchQuery(
  $first: Int
  $after: String
) {
  ...CitiesPagination_cities_2HEEH6
}

fragment CitiesPagination_cities_2HEEH6 on Query {
  cities(first: $first, after: $after) {
    ...CitiesList_conn
  }
}

fragment CitiesList_conn on CityConnection {
  edges {
    node {
      id
      ...City_city
    }
    cursor
  }
  pageInfo {
    hasNextPage
    endCursor
    hasPreviousPage
    startCursor
  }
}

fragment City_city on City {
  name
  lat
  lng
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesPaginationRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "CitiesPagination_cities",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesPaginationRefetchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CityConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "CityEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "City",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "id",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "lat",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "lng",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cursor",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pageInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "PageInfo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasNextPage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "endCursor",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasPreviousPage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "startCursor",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesPaginationRefetchQuery",
    "id": null,
    "text": "query CitiesPaginationRefetchQuery(\n  $first: Int\n  $after: String\n) {\n  ...CitiesPagination_cities_2HEEH6\n}\n\nfragment CitiesPagination_cities_2HEEH6 on Query {\n  cities(first: $first, after: $after) {\n    ...CitiesList_conn\n  }\n}\n\nfragment CitiesList_conn on CityConnection {\n  edges {\n    node {\n      id\n      ...City_city\n    }\n    cursor\n  }\n  pageInfo {\n    hasNextPage\n    endCursor\n    hasPreviousPage\n    startCursor\n  }\n}\n\nfragment City_city on City {\n  name\n  lat\n  lng\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '69b23d1f3d5cda741b950cefd6d2e6ae';
module.exports = node;
