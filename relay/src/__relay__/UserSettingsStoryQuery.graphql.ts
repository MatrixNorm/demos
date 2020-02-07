/* tslint:disable */
/* eslint-disable */
/* @relayHash 7737ba16118f2bbf281055c883cb63f3 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsStoryQueryVariables = {
    userId: string;
};
export type UserSettingsStoryQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"UserSettings_user">;
    } | null;
};
export type UserSettingsStoryQuery = {
    readonly response: UserSettingsStoryQueryResponse;
    readonly variables: UserSettingsStoryQueryVariables;
};



/*
query UserSettingsStoryQuery(
  $userId: ID!
) {
  node(id: $userId) {
    __typename
    ... on User {
      ...UserSettings_user
    }
    id
  }
}

fragment UserSettings_user on User {
  id
  settings {
    citiesPaginationPageSize
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserSettingsStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "type": "User",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "UserSettings_user",
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
    "name": "UserSettingsStoryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "User",
            "selections": [
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
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "UserSettingsStoryQuery",
    "id": null,
    "text": "query UserSettingsStoryQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      ...UserSettings_user\n    }\n    id\n  }\n}\n\nfragment UserSettings_user on User {\n  id\n  settings {\n    citiesPaginationPageSize\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '6867f973da9d4a740de46452a807b000';
export default node;
