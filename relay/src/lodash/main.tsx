import * as _ from "lodash";

let object = { a: { b: { c: 3 } } };
_.set(object, ["a", "b", "x"], 5);
console.log(object);
