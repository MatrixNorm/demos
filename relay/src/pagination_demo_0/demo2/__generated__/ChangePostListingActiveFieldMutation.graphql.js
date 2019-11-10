/**
 * @flow
 * @relayHash 6975120a95d9c7ca66802392f700927b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PostOrderingField = "createdAt" | "viewsCount";
export type ChangePostListingActiveFieldInput = {|
  postListingId: string,
  activeField: PostOrderingField,
|};
export type ChangePostListingActiveFieldMutationVariables = {|
  input: ChangePostListingActiveFieldInput
|};
export type ChangePostListingActiveFieldMutationResponse = {|
  +changePostListingActiveField: {|
    +postListing: {|
      +id: string,
      +activeField: PostOrderingField,
    |}
  |}
|};
export type ChangePostListingActiveFieldMutation = {|
  variables: ChangePostListingActiveFieldMutationVariables,
  response: ChangePostListingActiveFieldMutationResponse,
|};
*/


/*
mutation ChangePostListingActiveFieldMutation(
  $input: ChangePostListingActiveFieldInput!
) {
  changePostListingActiveField(input: $input) @local {
    postListing {
      id
      activeField
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ChangePostListingActiveFieldInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "changePostListingActiveField",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ChangePostListingActiveFieldPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "postListing",
        "storageKey": null,
        "args": null,
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
    "name": "ChangePostListingActiveFieldMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ChangePostListingActiveFieldMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ChangePostListingActiveFieldMutation",
    "id": null,
    "text": "mutation ChangePostListingActiveFieldMutation(\n  $input: ChangePostListingActiveFieldInput!\n) {\n  changePostListingActiveField(input: $input) @local {\n    postListing {\n      id\n      activeField\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7145245fd7b37a974d73273c36285f5d';
module.exports = node;
