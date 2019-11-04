/**
 * @flow
 * @relayHash fde898e7e697ac3a39310312a44f02ea
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
  +__typename: string,
  +localState: {|
    +postListingState: ?{|
      +$fragmentRefs: OrderSelector_state$ref
    |}
  |},
|};
export type PostsViewQuery = {|
  variables: PostsViewQueryVariables,
  response: PostsViewQueryResponse,
|};
*/


/*
query PostsViewQuery {
  __typename
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v2 = [
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
      (v1/*: any*/),
      {
        "kind": "ClientExtension",
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
                "name": "postListingState",
                "storageKey": null,
                "args": (v2/*: any*/),
                "concreteType": "PostListingState",
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
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PostsViewQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v1/*: any*/),
      {
        "kind": "ClientExtension",
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
                "name": "postListingState",
                "storageKey": null,
                "args": (v2/*: any*/),
                "concreteType": "PostListingState",
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
                    "name": "allOrderings",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PostOrdering",
                    "plural": true,
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PostsViewQuery",
    "id": null,
    "text": "query PostsViewQuery {\n  __typename\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '19802346acc13f679083066d98bec0fe';
module.exports = node;
