import Repository from '../Repository'


export interface IDisconnectUserArguments {
  deleteIfNoCompany?: boolean
}

export interface ISetClusterArguments {
  cluster: number
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-24
 */
class CompanyRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * Disconnect the user from the company.
   *
   * request url: /kapi/v1//v1/{application}/company/{company}/disconnect/{user}
   * request method: PUT
   *
   * @param application
   * @param company
   * @param user
   * @param {Object} args
   * @param {Boolean} args.deleteIfNoCompany  (default: false)
   */
  async disconnectUser(application, company, user, args: IDisconnectUserArguments): Promise<any> {
    const route = { path: '/v1/{application}/company/{company}/disconnect/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, company, user }, args)

    return this.connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1//api/{application}/company/{company}
   * request method: POST
   *
   * @param application
   * @param company
   * @param {Object} args
   * @param {Number} args.cluster
   */
  async setCluster(application, company, args: ISetClusterArguments): Promise<any> {
    const route = { path: '/api/{application}/company/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, company }, args)
    const requiredArguments = ['cluster']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default CompanyRepository
