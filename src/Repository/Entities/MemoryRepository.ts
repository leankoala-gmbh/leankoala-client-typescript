const Repository = require('../Repository')


export interface ISetArguments {
  key: string
  value: string
}



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-11
 */
class MemoryRepository extends Repository {

  /**
   * request url: /kapi/v1/memory/{objectType}/{objectId}
   * request method: GET
   *
   * @param objectType
   * @param objectId
   * @param {Object} args
   */
  async getAll(objectType, objectId): Promise<any> {
    const route = { path: 'memory/{objectType}/{objectId}', method: 'GET', version: 1 }
    const argList = Object.assign({ objectType, objectId }, args)

    return this._connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/memory/{objectType}/{objectId}
   * request method: POST
   *
   * @param objectType
   * @param objectId
   * @param {Object} args
   * @param {String} args.key 
   * @param {String} args.value 
   */
  async set(objectType, objectId, args: ISetArguments): Promise<any> {
    const route = { path: 'memory/{objectType}/{objectId}', method: 'POST', version: 1 }
    const argList = Object.assign({ objectType, objectId }, args)
    const requiredArguments = ['key', 'value']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = MemoryRepository
