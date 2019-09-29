/**
 * @flow
 * @relayHash 2de6f1e4784b961adb0b266e3538ee6d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesList_conn$ref } from "./CitiesList_conn.graphql";
export type AppQueryVariables = {||};
export type AppQueryResponse = {|
  +cities: ?{|
    +$fragmentRefs: CitiesList_conn$ref
  |}
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery {
  cities {
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

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": null,
        "concreteType": "CityConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CitiesList_conn",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": null,
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
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery {\n  cities {\n    ...CitiesList_conn\n  }\n}\n\nfragment CitiesList_conn on CityConnection {\n  edges {\n    node {\n      id\n      ...City_city\n    }\n    cursor\n  }\n  pageInfo {\n    hasNextPage\n    endCursor\n    hasPreviousPage\n    startCursor\n  }\n}\n\nfragment City_city on City {\n  name\n  lat\n  lng\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '14c7e1e3bdd4b89d4cb21654ec60999c';
module.exports = node;
