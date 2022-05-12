import Repository from '../Repository'



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class CheckA11yRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Return all current accessibility audit results for the given systems components.
   *
   * request url: /kapi/v1/check/checks/{system}/a11y/results
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system): Promise<any> {
    const route = { path: 'check/checks/{system}/a11y/results', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

}

export default CheckA11yRepository
