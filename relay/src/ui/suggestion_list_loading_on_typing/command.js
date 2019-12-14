export const createCommandInterpreter = commandConfig => dispatch => {
  return command => {
    let taskRunner = commandConfig[command.type];
    taskRunner && taskRunner.run(command, dispatch);
  };
};

export class CommandRunnerTakeLatest {
  constructor(promiseFromCommand, resultToAction, errorToAction) {
    this._commandCounter = 0;
    this.promiseFromCommand = promiseFromCommand;
    this.resultToAction = resultToAction;
    this.errorToAction = errorToAction;
  }

  run(command, dispatch) {
    let commandNumber = this._commandCounter;
    this.promiseFromCommand(command)
      .then(result => {
        if (commandNumber === this._commandCounter) {
          dispatch(this.resultToAction(result));
        }
      })
      .catch(error => {
        if (commandNumber === this._commandCounter) {
          dispatch(this.errorToAction(error));
        }
      });
    this._commandCounter++;
  }
}
