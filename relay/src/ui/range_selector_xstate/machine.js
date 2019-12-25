import { assign } from "xstate";

export const machineDef = ({ machineId, width, Min, Max }) => ({
  id: machineId,
  context: {
    width,
    xa: 0,
    xb: width,
    Min,
    Max
  },
  states: {
    idle: {
      on: {
        GRAB_A: {
          target: "aIsGrabbed"
        },
        GRAB_B: {
          target: "bIsGrabbed"
        }
      }
    },
    aIsGrabbed: {
      on: {
        RELEASE_A: {
          target: "idle"
        },
        MOVE: {
          target: "aIsGrabbed"
        }
      }
    },
    bIsGrabbed: {
      on: {
        RELEASE_B: {
          target: "idle"
        },
        MOVE: {
          target: "bIsGrabbed"
        }
      }
    }
  }
});
