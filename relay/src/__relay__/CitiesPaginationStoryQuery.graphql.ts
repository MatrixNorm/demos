/* tslint:disable */
/* eslint-disable */
/* @relayHash ae593bdaf7ff0d357fad836317dd05cd */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitiesPaginationStoryQueryVariables = {};
export type CitiesPaginationStoryQueryResponse = {
    readonly citiesPagination: {
        readonly " $fragmentRefs": FragmentRefs<"CitiesPagination_page">;
    } | null;
};
export type CitiesPaginationStoryQuery = {
    readonly response: CitiesPaginationStoryQueryResponse;
    readonly variables: CitiesPaginationStoryQueryVariables;
};



/*
query CitiesPaginationStoryQuery {
  citiesPagination {
    ...CitiesPagination_page
  }
}

fragment CitiesPagination_page on CitiesPagination {
  hasNext
  hasPrev
  nodes {
    id
    ...CitySummary_city
  }
}

fragment CitySummary_city on City {
  id
  name
  country
  population
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesPaginationStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesPagination",
        "storageKey": null,
        "args": null,
        "concreteType": "CitiesPagination",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CitiesPagination_page",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesPaginationStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesPagination",
        "storageKey": null,
        "args": null,
        "concreteType": "CitiesPagination",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasNext",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasPrev",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "nodes",
            "storageKey": null,
            "args": null,
            "concreteType": "City",
            "plural": true,
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
    "name": "CitiesPaginationStoryQuery",
    "id": null,
    "text": "query CitiesPaginationStoryQuery {\n  citiesPagination {\n    ...CitiesPagination_page\n  }\n}\n\nfragment CitiesPagination_page on CitiesPagination {\n  hasNext\n  hasPrev\n  nodes {\n    id\n    ...CitySummary_city\n  }\n}\n\nfragment CitySummary_city on City {\n  id\n  name\n  country\n  population\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '84e5c136ff8c43a8f94af36a149ad56a';
export default node;
