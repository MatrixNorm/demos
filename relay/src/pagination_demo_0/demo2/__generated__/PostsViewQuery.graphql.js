/**
 * @flow
 * @relayHash 5950af312d005a06a1261ad5da6fe4f5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { OrderSelector_state$ref } from "./OrderSelector_state.graphql";
export type PostsViewQueryVariables = {|
  listingId: string
|};
export type PostsViewQueryResponse = {|
  +localState: {|
    +postListing: ?{|
      +$fragmentRefs: OrderSelector_state$ref
    |}
  |}
|};
export type PostsViewQuery = {|
  variables: PostsViewQueryVariables,
  response: PostsViewQueryResponse,
|};
*/


/*
query PostsViewQuery(
  $listingId: ID!
) {
  localState @local {
    postListing(id: $listingId) {
      ...OrderSelector_state
      id
    }
  }
}

fragment OrderSelector_state on PostListing {
  activeField
  configuration {
    order {
      field
      desc
    }
    fieldDescription_ASC
    fieldDescription_DESC
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "listingId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "listingId"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PostsViewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "localState",
        "storageKey": null,
        "args": null,
        "concreteType": "LocalState",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "postListing",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "PostListing",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "OrderSelector_state",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PostsViewQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "localState",
        "storageKey": null,
        "args": null,
        "concreteType": "LocalState",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "postListing",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "PostListing",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "activeField",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "configuration",
                "storageKey": null,
                "args": null,
                "concreteType": "PostListingOrdering",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PostOrdering",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "field",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "desc",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fieldDescription_ASC",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fieldDescription_DESC",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
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
    "name": "PostsViewQuery",
    "id": null,
    "text": "query PostsViewQuery(\n  $listingId: ID!\n) {\n  localState @local {\n    postListing(id: $listingId) {\n      ...OrderSelector_state\n      id\n    }\n  }\n}\n\nfragment OrderSelector_state on PostListing {\n  activeField\n  configuration {\n    order {\n      field\n      desc\n    }\n    fieldDescription_ASC\n    fieldDescription_DESC\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fb30a2aafb02ed12d0fafaba64129bd6';
module.exports = node;
