import Repository from '../Repository'



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class CheckCookieRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * This endpoint returns a list of domains that set cookies for the given system. As array elements it
   * adds the components on that the domain sets the cookies. IMPORTANT: The leankoala worker is blocking
   * some tracking integrations. So there will never be, for example, a Google Analytics cookie set.
   *
   * request url: /kapi/v1/check/checks/{system}/cookies/domains
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getDomains(system): Promise<any> {
    const route = { path: 'check/checks/{system}/cookies/domains', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

}

export default CheckCookieRepository
