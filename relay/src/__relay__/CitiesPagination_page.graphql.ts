/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitiesPagination_page = {
    readonly pageNo: number;
    readonly hasNextPage: boolean;
    readonly hasPrevPage: boolean;
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
      "name": "pageNo",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasNextPage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasPrevPage",
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
(node as any).hash = '5b5892f51a999fcab437edfd29dc9f51';
export default node;
