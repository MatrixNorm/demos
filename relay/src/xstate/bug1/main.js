import { Machine, interpret } from "xstate";

/*
Consider this simple machine. If event `FOO` is received within 1.5 seconds
state X should be re-entered and delayed `after` transition resetted. Even if state X is re-entered many times,
`after` transition should be fired only once. Sure enough all works as expected here.
*/

const machineGood = Machine({
  id: "someMachine",
  initial: "X",
  states: {
    X: {
      on: {
        FOO: "X"
      },
      after: {
        1500: {
          target: "Y"
        }
      }
    },
    Y: {}
  }
});

/*
But if conditional transtions are added to the `after` things get wrong.
The following machine should exhibit the same behavior but in fact it is different.
In this case delayed transition is fired multiple times. 
*/

const machineBug = Machine({
  id: "someMachine",
  initial: "X",
  states: {
    X: {
      on: {
        FOO: "X"
      },
      after: {
        1500: [
          {
            target: "Y",
            cond: () => 1 > 0
          },
          {
            target: "Z"
          }
        ]
      }
    },
    Y: {},
    Z: {}
  }
});

function sleep(period) {
  return new Promise(r => setTimeout(r, period));
}

async function demo(machine) {
  // expected outcome in the comments
  const service = interpret(machine).onTransition(state =>
    console.log(state.value)
  );
  service.start();
  //X
  await sleep(1000);
  service.send({ type: "FOO" });
  //X
  await sleep(1000);
  service.send({ type: "FOO" });
  //X
  //...after 1500 ms
  //Y
}

demo(machineGood);
//X
//X
//X
//Y
demo(machineBug);
//X
//X
//Y
//Y
//Y
