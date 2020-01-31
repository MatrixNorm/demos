/* tslint:disable */
/* eslint-disable */
/* @relayHash 9f3c3b1bbd593a8be30d034034866a88 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchParametersStoryQueryVariables = {};
export type SearchParametersStoryQueryResponse = {
    readonly citiesMetadata: {
        readonly " $fragmentRefs": FragmentRefs<"SearchParameters_metadata">;
    } | null;
};
export type SearchParametersStoryQuery = {
    readonly response: SearchParametersStoryQueryResponse;
    readonly variables: SearchParametersStoryQueryVariables;
};



/*
query SearchParametersStoryQuery {
  citiesMetadata {
    ...SearchParameters_metadata
  }
}

fragment SearchParameters_metadata on CitiesMetadata {
  populationLowerBound
  populationUpperBound
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SearchParametersStoryQuery",
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
            "name": "SearchParameters_metadata",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SearchParametersStoryQuery",
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
            "name": "populationLowerBound",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "populationUpperBound",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SearchParametersStoryQuery",
    "id": null,
    "text": "query SearchParametersStoryQuery {\n  citiesMetadata {\n    ...SearchParameters_metadata\n  }\n}\n\nfragment SearchParameters_metadata on CitiesMetadata {\n  populationLowerBound\n  populationUpperBound\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'd1dc76429bdea7a5f8e3bd14a8955125';
export default node;
