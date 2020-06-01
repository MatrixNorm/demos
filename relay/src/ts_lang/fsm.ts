// Consider following function overloading and implementation.

function foo(param: number): boolean;
function foo(param: string): string;

function foo(param) {
  if (typeof param === "number") {
    // typescript does not complain that 12 is not boolean
    return 12;
  } else if (typeof param === "string") {
    // typescript does not complain that {} is not string
    return {};
  }
}

/*

Here is how one can interprete it:
  1. if function foo takes numeric param it should return boolean
  2. if function foo takes string param it should return string
  3. another calls should be prohibited

Sure it is possible for type checker to verify 1&2 by analizing function code.
But typescript does not do this - it only does 3.

Is it possible to acheave in typescript above mentioned behaviour?

*/
