export default class Repository {
  protected connectionType: string
  protected connection: any

  constructor() {
    this.connectionType = 'MasterConnection'
  }

  /**
   * Throw an exception if a mandatory argument is not set.
   *
   * @param requiredArguments
   * @param actualArguments
   * @private
   */
  protected _assertValidArguments(requiredArguments: any[], actualArguments: any) {
    requiredArguments.forEach(function (argument) {
      if (!(argument in actualArguments)) {
        throw new Error(
          `The mandatory argument ${argument} could not be found in the argument object.`
        )
      }
    })
  }

  setConnection(connection) {
    this.connection = connection
  }

  getConnectionType() {
    return this.connectionType
  }
}
