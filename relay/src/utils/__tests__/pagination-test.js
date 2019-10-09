/* globals describe test expect */
import { _paginate_forwards } from "../server";

const testData = [
  { id: "1", x: "C" },
  { id: "2", x: "H" },
  { id: "3", x: "F" },
  { id: "4", x: "A" },
  { id: "5", x: "G" },
  { id: "6", x: "D" },
  { id: "7", x: "I" },
  { id: "8", x: "B" },
  { id: "9", x: "E" }
];

describe("_paginate_forwards", () => {
  const A_I = [...testData]; 
  A_I.sort((a, b) => (a.x < b.x ? -1 : 1));
  const N = 4;

  test("first page", () => {
    const { edges, pageInfo } = _paginate_forwards({ array: A_I, first: N });

    expect(edges).toEqual([
      { cursor: "4", node: { id: "4", x: "A" } },
      { cursor: "8", node: { id: "8", x: "B" } },
      { cursor: "1", node: { id: "1", x: "C" } },
      { cursor: "6", node: { id: "6", x: "D" } }
    ]);

    expect(pageInfo).toEqual({
      hasNextPage: true,
      hasPreviousPage: false,
      startCursor: "4",
      endCursor: "6"
    });
  });
});
