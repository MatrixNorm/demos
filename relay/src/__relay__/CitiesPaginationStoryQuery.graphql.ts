/* tslint:disable */
/* eslint-disable */
/* @relayHash 0595cdb14e645e1a4c599a2961989e72 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitiesPaginationStoryQueryVariables = {
    pageNo: number;
};
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
query CitiesPaginationStoryQuery(
  $pageNo: Int!
) {
  citiesPagination(pageNo: $pageNo) {
    ...CitiesPagination_page
  }
}

fragment CitiesPagination_page on CitiesPagination {
  pageNo
  hasNextPage
  hasPrevPage
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

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageNo",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "pageNo",
    "variableName": "pageNo"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesPaginationStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesPagination",
        "storageKey": null,
        "args": (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesPagination",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CitiesPagination",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "pageNo",
            "args": null,
            "storageKey": null
          },
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
            "name": "hasPrevPage",
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
    "text": "query CitiesPaginationStoryQuery(\n  $pageNo: Int!\n) {\n  citiesPagination(pageNo: $pageNo) {\n    ...CitiesPagination_page\n  }\n}\n\nfragment CitiesPagination_page on CitiesPagination {\n  pageNo\n  hasNextPage\n  hasPrevPage\n  nodes {\n    id\n    ...CitySummary_city\n  }\n}\n\nfragment CitySummary_city on City {\n  id\n  name\n  country\n  population\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'c6a346bb91589ee36fcf52623fcf7dae';
export default node;
