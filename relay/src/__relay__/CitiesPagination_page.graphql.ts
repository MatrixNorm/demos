/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitiesPagination_page = {
    readonly hasNext: boolean;
    readonly hasPrev: boolean;
    readonly nodes: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"CitySummary_city">;
    }> | null;
    readonly " $refType": "CitiesPagination_page";
};
export type CitiesPagination_page$data = CitiesPagination_page;
export type CitiesPagination_page$key = {
    readonly " $data"?: CitiesPagination_page$data;
    readonly " $fragmentRefs": FragmentRefs<"CitiesPagination_page">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CitiesPagination_page",
  "type": "CitiesPagination",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasNext",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasPrev",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "nodes",
      "storageKey": null,
      "args": null,
      "concreteType": "City",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "CitySummary_city",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '953b2e461d6767b780fc9a76c6d99545';
export default node;
