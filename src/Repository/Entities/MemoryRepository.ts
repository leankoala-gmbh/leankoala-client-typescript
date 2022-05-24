import Repository from '../Repository'


export interface ISetArguments {
  key: string
  value: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-24
 */
class MemoryRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * Write something to the memory
   *
   * request url: /{application}/memory/{objectType}/{objectId}
   * request method: PUT
   *
   * @param application
   * @param objectType
   * @param objectId
   * @param {Object} args
   * @param {String} args.key 
   * @param {String} args.value 
   */
  async set(application, objectType, objectId, args: ISetArguments): Promise<any> {
    const route = { path: '/{application}/memory/{objectType}/{objectId}', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, objectType, objectId }, args)
    const requiredArguments = ['key', 'value']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default MemoryRepository
