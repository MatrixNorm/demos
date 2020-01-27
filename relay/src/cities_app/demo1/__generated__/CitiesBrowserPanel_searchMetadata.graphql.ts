/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitiesBrowserPanel_searchMetadata = {
    readonly citiesMetadata: {
        readonly " $fragmentRefs": FragmentRefs<"SearchParameters_metadata">;
    } | null;
    readonly " $refType": "CitiesBrowserPanel_searchMetadata";
};
export type CitiesBrowserPanel_searchMetadata$data = CitiesBrowserPanel_searchMetadata;
export type CitiesBrowserPanel_searchMetadata$key = {
    readonly " $data"?: CitiesBrowserPanel_searchMetadata$data;
    readonly " $fragmentRefs": FragmentRefs<"CitiesBrowserPanel_searchMetadata">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CitiesBrowserPanel_searchMetadata",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "citiesMetadata",
      "storageKey": null,
      "args": null,
      "concreteType": "CitiesMetadata",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "SearchParameters_metadata",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '7ab3363c9f674b7506f2efc60ce4169f';
export default node;
