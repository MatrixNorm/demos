/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type UserDetails_user$ref: FragmentReference;
declare export opaque type UserDetails_user$fragmentType: UserDetails_user$ref;
export type UserDetails_user = {|
  +name: ?string,
  +posts: ?$ReadOnlyArray<?{|
    +title: ?string
  |}>,
  +$refType: UserDetails_user$ref,
|};
export type UserDetails_user$data = UserDetails_user;
export type UserDetails_user$key = {
  +$data?: UserDetails_user$data,
  +$fragmentRefs: UserDetails_user$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "UserDetails_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "posts",
      "storageKey": null,
      "args": null,
      "concreteType": "Post",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '9102c25619d5fbc28a3c6e72793f7124';
module.exports = node;
