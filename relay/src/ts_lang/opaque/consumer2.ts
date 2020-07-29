import { Compacted, compactObject, merge } from "./provider2";

type User = {
  id: string;
  name: string;
  age?: number;
  address?: number;
};

let user = { id: "1", name: "Jason", age: undefined };
let compactedUser = compactObject(user);

function process(user: Compacted<User>) {}

let x = merge(user, compactedUser);
process(x);
let y = merge(compactedUser, compactedUser);
process(y);
