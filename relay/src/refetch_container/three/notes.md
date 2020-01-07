QueryRenderer query
JSON.stringify(query(), null, 2)

```json
{
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "pageNo",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Pagination_cities",
        "args": [
          {
            "kind": "Variable",
            "name": "pageNo",
            "variableName": "pageNo"
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "pageNo",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": [
          {
            "kind": "Variable",
            "name": "pageNo",
            "variableName": "pageNo"
          }
        ],
        "concreteType": "CityPagination",
        "plural": false,
        "selections": [
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
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "population",
                "args": null,
                "storageKey": null
              }
            ]
          },
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
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $pageNo: Int!\n) {\n  ...Pagination_cities_2HjlGh\n}\n\nfragment Pagination_cities_2HjlGh on Query {\n  cities(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    pageNo\n    hasNextPage\n  }\n}\n",
    "metadata": {}
  },
  "hash": "0fdca04540de28fb4bf7e7946f355812"
}
```

let request = getRequest(query);
let operation = createOperationDescriptor(request, variables);
JSON.stringify(operation, null, 2)

```json
{
  "fragment": {
    "kind": "SingularReaderSelector",
    "dataID": "client:root",
    "node": {
      "kind": "Fragment",
      "name": "AppQuery",
      "type": "Query",
      "metadata": null,
      "argumentDefinitions": [
        {
          "kind": "LocalArgument",
          "name": "pageNo",
          "type": "Int!",
          "defaultValue": null
        }
      ],
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Pagination_cities",
          "args": [
            {
              "kind": "Variable",
              "name": "pageNo",
              "variableName": "pageNo"
            }
          ]
        }
      ]
    },
    "variables": {
      "pageNo": 0
    },
    "owner": {
      "identifier": "query AppQuery(\n  $pageNo: Int!\n) {\n  ...Pagination_cities_2HjlGh\n}\n\nfragment Pagination_cities_2HjlGh on Query {\n  cities(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    pageNo\n    hasNextPage\n  }\n}\n{\"pageNo\":0}",
      "node": {
        "kind": "Request",
        "fragment": {
          "kind": "Fragment",
          "name": "AppQuery",
          "type": "Query",
          "metadata": null,
          "argumentDefinitions": [
            {
              "kind": "LocalArgument",
              "name": "pageNo",
              "type": "Int!",
              "defaultValue": null
            }
          ],
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "Pagination_cities",
              "args": [
                {
                  "kind": "Variable",
                  "name": "pageNo",
                  "variableName": "pageNo"
                }
              ]
            }
          ]
        },
        "operation": {
          "kind": "Operation",
          "name": "AppQuery",
          "argumentDefinitions": [
            {
              "kind": "LocalArgument",
              "name": "pageNo",
              "type": "Int!",
              "defaultValue": null
            }
          ],
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "cities",
              "storageKey": null,
              "args": [
                {
                  "kind": "Variable",
                  "name": "pageNo",
                  "variableName": "pageNo"
                }
              ],
              "concreteType": "CityPagination",
              "plural": false,
              "selections": [
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
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "name",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "population",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
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
                }
              ]
            }
          ]
        },
        "params": {
          "operationKind": "query",
          "name": "AppQuery",
          "id": null,
          "text": "query AppQuery(\n  $pageNo: Int!\n) {\n  ...Pagination_cities_2HjlGh\n}\n\nfragment Pagination_cities_2HjlGh on Query {\n  cities(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    pageNo\n    hasNextPage\n  }\n}\n",
          "metadata": {}
        },
        "hash": "0fdca04540de28fb4bf7e7946f355812"
      },
      "variables": {
        "pageNo": 0
      }
    }
  },
  "request": {
    "identifier": "query AppQuery(\n  $pageNo: Int!\n) {\n  ...Pagination_cities_2HjlGh\n}\n\nfragment Pagination_cities_2HjlGh on Query {\n  cities(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    pageNo\n    hasNextPage\n  }\n}\n{\"pageNo\":0}",
    "node": {
      "kind": "Request",
      "fragment": {
        "kind": "Fragment",
        "name": "AppQuery",
        "type": "Query",
        "metadata": null,
        "argumentDefinitions": [
          {
            "kind": "LocalArgument",
            "name": "pageNo",
            "type": "Int!",
            "defaultValue": null
          }
        ],
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Pagination_cities",
            "args": [
              {
                "kind": "Variable",
                "name": "pageNo",
                "variableName": "pageNo"
              }
            ]
          }
        ]
      },
      "operation": {
        "kind": "Operation",
        "name": "AppQuery",
        "argumentDefinitions": [
          {
            "kind": "LocalArgument",
            "name": "pageNo",
            "type": "Int!",
            "defaultValue": null
          }
        ],
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "cities",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "pageNo",
                "variableName": "pageNo"
              }
            ],
            "concreteType": "CityPagination",
            "plural": false,
            "selections": [
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
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "population",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
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
              }
            ]
          }
        ]
      },
      "params": {
        "operationKind": "query",
        "name": "AppQuery",
        "id": null,
        "text": "query AppQuery(\n  $pageNo: Int!\n) {\n  ...Pagination_cities_2HjlGh\n}\n\nfragment Pagination_cities_2HjlGh on Query {\n  cities(pageNo: $pageNo) {\n    nodes {\n      id\n      name\n      population\n    }\n    pageNo\n    hasNextPage\n  }\n}\n",
        "metadata": {}
      },
      "hash": "0fdca04540de28fb4bf7e7946f355812"
    },
    "variables": {
      "pageNo": 0
    }
  },
  "root": {
    "dataID": "client:root",
    "node": {
      "kind": "Operation",
      "name": "AppQuery",
      "argumentDefinitions": [
        {
          "kind": "LocalArgument",
          "name": "pageNo",
          "type": "Int!",
          "defaultValue": null
        }
      ],
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cities",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "pageNo",
              "variableName": "pageNo"
            }
          ],
          "concreteType": "CityPagination",
          "plural": false,
          "selections": [
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
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "name",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "population",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
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
            }
          ]
        }
      ]
    },
    "variables": {
      "pageNo": 0
    }
  }
}
```
