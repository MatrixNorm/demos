/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettings_user = {
    readonly id: string;
    readonly settings: {
        readonly citiesPaginationPageSize: number | null;
    } | null;
    readonly " $refType": "UserSettings_user";
};
export type UserSettings_user$data = UserSettings_user;
export type UserSettings_user$key = {
    readonly " $data"?: UserSettings_user$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSettings_user">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "UserSettings_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
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
};
(node as any).hash = 'edbe1c0fc6d89bdbd6346e00ec8ef637';
export default node;
