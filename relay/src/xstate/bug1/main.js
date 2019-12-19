import { Machine, interpret } from "xstate";

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
  // comments is expected outcome
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

//demo(machineGood);
demo(machineBug);
