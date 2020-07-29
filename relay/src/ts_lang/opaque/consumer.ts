import { Compacted, compactObject } from "./provider";

type User = {
  id: string;
  name: string;
  age?: number;
  address?: number;
};

let user = { id: "1", name: "Jason", age: undefined };
let compactedUser = compactObject(user);
let x = { ...user, ...compactedUser };

function process(user: Compacted<User>) {}
// no type error
process(x);
