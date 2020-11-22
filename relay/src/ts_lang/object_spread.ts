type Foo = {
  x: string;
  y: number;
};

let a: Foo = {
  x: "@",
  y: 3,
};

let b: Partial<Foo> = { x: "#", y: undefined };

let c = { ...a, ...b };

let c1: Foo = Object.assign(a, b);

/*

Consider this code snippet:

```
type Foo = {
  x: string;
  y: number;
};

let a: Foo = {
  x: "@",
  y: 3,
};

let b: Partial<Foo> = { x: "#", y: undefined };

let c = { ...a, ...b };
```

Clearly type of `c` cannot be `Foo` because property `y` is `undefined`: 
runtime value of `c` is {x: "#", y: undefined} (at least in Chrome). 
Yet Typescript infers `c` type as `{ x: string; y: number;}`. 
You can check in https://www.typescriptlang.org/play for  version 4.0.5. 
I'm confused.

*/
