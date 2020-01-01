/**
 * @flow
 * @relayHash 2d71dab138b3967b8afb06f6395c4d5b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { SelectCountryWidget_value$ref } from "./SelectCountryWidget_value.graphql";
import type { SelectPopulationWidget_meta$ref } from "./SelectPopulationWidget_meta.graphql";
import type { SelectPopulationWidget_value$ref } from "./SelectPopulationWidget_value.graphql";
export type CitiesPaginationParametersPanelQueryVariables = {||};
export type CitiesPaginationParametersPanelQueryResponse = {|
  +citiesMetadata: ?{|
    +$fragmentRefs: SelectPopulationWidget_meta$ref
  |},
  +uiState: {|
    +citySearchParams: ?{|
      +$fragmentRefs: SelectCountryWidget_value$ref & SelectPopulationWidget_value$ref
    |}
  |},
|};
export type CitiesPaginationParametersPanelQuery = {|
  variables: CitiesPaginationParametersPanelQueryVariables,
  response: CitiesPaginationParametersPanelQueryResponse,
|};
*/


/*
query CitiesPaginationParametersPanelQuery {
  citiesMetadata {
    ...SelectPopulationWidget_meta
  }
}

fragment SelectPopulationWidget_meta on CitiesMetadata {
  populationLowerBound
  populationUpperBound
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesPaginationParametersPanelQuery",
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
            "name": "SelectPopulationWidget_meta",
            "args": null
          }
        ]
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "uiState",
            "storageKey": null,
            "args": null,
            "concreteType": "UIState",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "citySearchParams",
                "storageKey": null,
                "args": null,
                "concreteType": "UICitySearchParams",
                "plural": false,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "SelectCountryWidget_value",
                    "args": null
                  },
                  {
                    "kind": "FragmentSpread",
                    "name": "SelectPopulationWidget_value",
                    "args": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesPaginationParametersPanelQuery",
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
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "uiState",
            "storageKey": null,
            "args": null,
            "concreteType": "UIState",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "citySearchParams",
                "storageKey": null,
                "args": null,
                "concreteType": "UICitySearchParams",
                "plural": false,
                "selections": [
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
                    "name": "populationUpper",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "populationLower",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesPaginationParametersPanelQuery",
    "id": null,
    "text": "query CitiesPaginationParametersPanelQuery {\n  citiesMetadata {\n    ...SelectPopulationWidget_meta\n  }\n}\n\nfragment SelectPopulationWidget_meta on CitiesMetadata {\n  populationLowerBound\n  populationUpperBound\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '2cf66fc1e59b68e8f6bd9f03e70f1332';
module.exports = node;
