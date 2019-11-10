/**
 * @flow
 * @relayHash d26772b35d34142a4357e40b3e2265cd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { OrderSelector_state$ref } from "./OrderSelector_state.graphql";
import type { PostPaginationContainer_order$ref } from "./PostPaginationContainer_order.graphql";
export type PostsViewQueryVariables = {|
  listingId: string
|};
export type PostsViewQueryResponse = {|
  +localState: {|
    +postListing: ?{|
      +$fragmentRefs: OrderSelector_state$ref & PostPaginationContainer_order$ref
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
      ...PostPaginationContainer_order
      id
    }
  }
}

fragment OrderSelector_state on PostListing {
  id
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

fragment PostPaginationContainer_order on PostListing {
  activeField
  configuration {
    order {
      field
      desc
    }
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
              },
              {
                "kind": "FragmentSpread",
                "name": "PostPaginationContainer_order",
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
                "name": "id",
                "args": null,
                "storageKey": null
              },
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
    "text": "query PostsViewQuery(\n  $listingId: ID!\n) {\n  localState @local {\n    postListing(id: $listingId) {\n      ...OrderSelector_state\n      ...PostPaginationContainer_order\n      id\n    }\n  }\n}\n\nfragment OrderSelector_state on PostListing {\n  id\n  activeField\n  configuration {\n    order {\n      field\n      desc\n    }\n    fieldDescription_ASC\n    fieldDescription_DESC\n  }\n}\n\nfragment PostPaginationContainer_order on PostListing {\n  activeField\n  configuration {\n    order {\n      field\n      desc\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '42feb14f12993c6062165b08c7577811';
module.exports = node;
