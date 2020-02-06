/* tslint:disable */
/* eslint-disable */
/* @relayHash 470f45bedfd5d8c598e47d60f37a3804 */

import { ConcreteRequest } from "relay-runtime";
export type ChangeCitiesPaginationPageSizeInput = {
    pageSize: number;
    userId: string;
};
export type ChangeCitiesPaginationPageSizeMutationVariables = {
    input: ChangeCitiesPaginationPageSizeInput;
};
export type ChangeCitiesPaginationPageSizeMutationResponse = {
    readonly changeCitiesPaginationPageSize: {
        readonly user: {
            readonly id: string;
            readonly settings: {
                readonly citiesPaginationPageSize: number | null;
            } | null;
        } | null;
    };
};
export type ChangeCitiesPaginationPageSizeMutation = {
    readonly response: ChangeCitiesPaginationPageSizeMutationResponse;
    readonly variables: ChangeCitiesPaginationPageSizeMutationVariables;
};



/*
mutation ChangeCitiesPaginationPageSizeMutation(
  $input: ChangeCitiesPaginationPageSizeInput!
) {
  changeCitiesPaginationPageSize(input: $input) {
    user {
      id
      settings {
        citiesPaginationPageSize
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ChangeCitiesPaginationPageSizeInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "changeCitiesPaginationPageSize",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ChangeCitiesPaginationPageSizePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "settings",
            "storageKey": null,
            "args": null,
            "concreteType": "UserSettings",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "citiesPaginationPageSize",
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
    "name": "ChangeCitiesPaginationPageSizeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ChangeCitiesPaginationPageSizeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ChangeCitiesPaginationPageSizeMutation",
    "id": null,
    "text": "mutation ChangeCitiesPaginationPageSizeMutation(\n  $input: ChangeCitiesPaginationPageSizeInput!\n) {\n  changeCitiesPaginationPageSize(input: $input) {\n    user {\n      id\n      settings {\n        citiesPaginationPageSize\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '95958c3f19d3f2d81085ea41eb77e337';
export default node;
