/**
 * @flow
 * @relayHash f7e94bf56fa72a57e3165c65587bd33e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CitiesPaginationListingPanelQueryVariables = {||};
export type CitiesPaginationListingPanelQueryResponse = {|
  +__typename: string,
  +uiState: {|
    +citySearchParams: ?{|
      +country: ?string
    |}
  |},
|};
export type CitiesPaginationListingPanelQuery = {|
  variables: CitiesPaginationListingPanelQueryVariables,
  response: CitiesPaginationListingPanelQueryResponse,
|};
*/


/*
query CitiesPaginationListingPanelQuery {
  __typename
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "__typename",
    "args": null,
    "storageKey": null
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
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesPaginationListingPanelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesPaginationListingPanelQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesPaginationListingPanelQuery",
    "id": null,
    "text": "query CitiesPaginationListingPanelQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '50abb31b69ae113fcfce54e9ff8554f6';
module.exports = node;
