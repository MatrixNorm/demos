/**
 * @flow
 * @relayHash bbddd2c78aa513e44cdbb2eabb5d2ced
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CityFeed_cities$ref } from "./CityFeed_cities.graphql";
export type CityFeedPaginationQueryVariables = {|
  count: number,
  cursor?: ?string,
|};
export type CityFeedPaginationQueryResponse = {|
  +$fragmentRefs: CityFeed_cities$ref
|};
export type CityFeedPaginationQuery = {|
  variables: CityFeedPaginationQueryVariables,
  response: CityFeedPaginationQueryResponse,
|};
*/


/*
query CityFeedPaginationQuery(
  $count: Int!
  $cursor: String
) {
  ...CityFeed_cities_1G22uz
}

fragment CityFeed_cities_1G22uz on Query {
  allCities(first: $count, after: $cursor) {
    edges {
      node {
        id
        ...City_city
        __typename
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
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
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CityFeedPaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "CityFeed_cities",
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CityFeedPaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "allCities",
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
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
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "allCities",
        "args": (v1/*: any*/),
        "handle": "connection",
        "key": "CityFeed_allCities",
        "filters": null
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CityFeedPaginationQuery",
    "id": null,
    "text": "query CityFeedPaginationQuery(\n  $count: Int!\n  $cursor: String\n) {\n  ...CityFeed_cities_1G22uz\n}\n\nfragment CityFeed_cities_1G22uz on Query {\n  allCities(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...City_city\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment City_city on City {\n  name\n  lat\n  lng\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd00bf09313a10e865282002a94bb31e3';
module.exports = node;
