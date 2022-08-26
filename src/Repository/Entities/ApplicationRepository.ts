import Repository from '../Repository'



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-08-19
 */
class ApplicationRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * request url: /application/whitelabel/config/cname/{cName}
   * request method: GET
   *
   * @param cName
   * @param {Object} args
   */
  async getConfigByCName(cName): Promise<any> {
    const route = { path: '/application/whitelabel/config/cname/{cName}', method: 'GET', version: 1 }
    const argList = Object.assign({ cName }, {})

    return this.connection.send(route, argList)
  }

  /**
   * request url: /{application}/cluster/primary
   * request method: POST
   *
   * @param application
   * @param {Object} args
   */
  async getPrimaryCluster(application): Promise<any> {
    const route = { path: '/{application}/cluster/primary', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, {})

    return this.connection.send(route, argList)
  }

}

export default ApplicationRepository
