import Repository from '../Repository'



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class CheckJavaScriptErrorsRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * request url: /kapi/v1/check/checks/{system}/jserrors
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system): Promise<any> {
    const route = { path: 'check/checks/{system}/jserrors', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

}

export default CheckJavaScriptErrorsRepository
