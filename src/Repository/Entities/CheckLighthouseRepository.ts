import Repository from '../Repository'


export interface IGetResultsArguments {
  targetGroup?: any
  use_cache?: boolean
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class CheckLighthouseRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Return all current lighthouse results for the given systems components.
   *
   * request url: /kapi/v1/check/checks/{system}/lighthouse/results/{category}
   * request method: GET
   *
   * @param system
   * @param category
   * @param {Object} args
   * @param {*} args.targetGroup The target group. It can be either an integer or a string. (default: 2000)
   * @param {Boolean} args.use_cache Use the cache for json document fetch (default: true)
   */
  async getResults(system, category, args: IGetResultsArguments): Promise<any> {
    const route = { path: 'check/checks/{system}/lighthouse/results/{category}', method: 'GET', version: 1 }
    const argList = Object.assign({ system, category }, args)

    return this.connection.send(route, argList)
  }

}

export default CheckLighthouseRepository
