export const createCommandInterpreter = commandConfig => dispatch => {
  return command => {
    let commandRunner = commandConfig[command.type];
    commandRunner &&
      commandRunner.run(command).then(action => action && dispatch(action));
  };
};

export class CommandRunnerTakeLatest {
  constructor(promiseFromCommand, resultToAction, errorToAction) {
    this._commandCounter = 0;
    this.promiseFromCommand = promiseFromCommand;
    this.resultToAction = resultToAction;
    this.errorToAction = errorToAction;
  }

  run(command) {
    let commandNumber = this._commandCounter;
    this.promiseFromCommand(command)
      .then(result => {
        if (commandNumber === this._commandCounter) {
          return this.resultToAction(result);
        }
      })
      .catch(error => {
        if (commandNumber === this._commandCounter) {
          return this.errorToAction(error);
        }
      });
    this._commandCounter++;
  }
}
