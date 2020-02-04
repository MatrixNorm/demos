/* tslint:disable */
/* eslint-disable */
/* @relayHash 19bb90e9c969c16b39ad7f86aa44b8a7 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitySummaryStoryQueryVariables = {
    cityId: string;
};
export type CitySummaryStoryQueryResponse = {
    readonly city: {
        readonly " $fragmentRefs": FragmentRefs<"CitySummary_city">;
    } | null;
};
export type CitySummaryStoryQuery = {
    readonly response: CitySummaryStoryQueryResponse;
    readonly variables: CitySummaryStoryQueryVariables;
};



/*
query CitySummaryStoryQuery(
  $cityId: ID!
) {
  city: node(id: $cityId) {
    __typename
    ...CitySummary_city
    id
  }
}

fragment CitySummary_city on City {
  id
  name
  country
  population
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "cityId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "cityId"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitySummaryStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "city",
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CitySummary_city",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitySummaryStoryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "city",
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "City",
            "selections": [
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
                "name": "country",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "population",
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
    "name": "CitySummaryStoryQuery",
    "id": null,
    "text": "query CitySummaryStoryQuery(\n  $cityId: ID!\n) {\n  city: node(id: $cityId) {\n    __typename\n    ...CitySummary_city\n    id\n  }\n}\n\nfragment CitySummary_city on City {\n  id\n  name\n  country\n  population\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'be7fc3132e74a2caa17dbff135e21613';
export default node;
