const Repository = require('../Repository')


export interface ICreateSequenceArguments {
  name: string
  startUrl: string
  steps?: list
}

export interface IUpdateSequenceArguments {
  name?: string
  startUrl?: string
  steps?: list
}



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-11
 */
class SequenceRepository extends Repository {

  /**
   * Get a list of possible commands
   *
   * request url: /kapi/v1/sequences/{project}/commands
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getCommands(project): Promise<any> {
    const route = { path: 'sequences/{project}/commands', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Get a list of possible commands
   *
   * request url: /kapi/v1/sequences/{project}/sequences
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getSequences(project): Promise<any> {
    const route = { path: 'sequences/{project}/sequences', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Create a new sequence.
   *
   * request url: /kapi/v1/sequences/{project}/sequence
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name The human readable name of the sequence.
   * @param {String} args.startUrl The url the sequence starts at.
   * @param {Array} args.steps List of steps of the sequence. (optional)
   */
  async createSequence(project, args: ICreateSequenceArguments): Promise<any> {
    const route = { path: 'sequences/{project}/sequence', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name', 'startUrl']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Update an existing sequence
   *
   * request url: /kapi/v1/sequences/{project}/sequence
   * request method: PUT
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name The human readable name of the sequence. (optional)
   * @param {String} args.startUrl The url the sequence starts at. (optional)
   * @param {Array} args.steps List of steps of the sequence. (optional)
   */
  async updateSequence(project, args: IUpdateSequenceArguments): Promise<any> {
    const route = { path: 'sequences/{project}/sequence', method: 'PUT', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Activate an existing sequence.
   *
   * request url: /kapi/v1/sequences/{sequence}/activate
   * request method: PUT
   *
   * @param sequence
   * @param {Object} args
   */
  async activateSequence(sequence): Promise<any> {
    const route = { path: 'sequences/{sequence}/activate', method: 'PUT', version: 1 }
    const argList = Object.assign({ sequence }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Deactivate an existing sequence.
   *
   * request url: /kapi/v1/sequences/{sequence}/deactivate
   * request method: PUT
   *
   * @param sequence
   * @param {Object} args
   */
  async deactivateSequence(sequence): Promise<any> {
    const route = { path: 'sequences/{sequence}/deactivate', method: 'PUT', version: 1 }
    const argList = Object.assign({ sequence }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Return a list of recent runs.
   *
   * request url: /kapi/v1/sequences/{sequence}/recent
   * request method: GET
   *
   * @param sequence
   * @param {Object} args
   */
  async getRecentRuns(sequence): Promise<any> {
    const route = { path: 'sequences/{sequence}/recent', method: 'GET', version: 1 }
    const argList = Object.assign({ sequence }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = SequenceRepository
