const m = {
  id: "suggestionsMachine",
  context: {},
  initial: "notTyping",
  states: {
    typing: {
      on: {
        TYPING: {
          target: "typing"
        }
      },
      after: {
        2000: [
          {
            target: "X"
          },
          {
            target: "Y"
          }
        ]
      }
    },
    X: {},
    Y: {}
  }
};
