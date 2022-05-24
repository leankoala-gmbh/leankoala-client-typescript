import Repository from '../Repository'


export interface ICreateApplicationArguments {
  name: string
  identifier: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-24
 */
class ApplicationRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * request url: /api/application
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.name 
   * @param {String} args.identifier 
   */
  async createApplication(args: ICreateApplicationArguments): Promise<any> {
    const route = { path: '/api/application', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['name', 'identifier']
    this._assertValidArguments(requiredArguments, argList)

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
