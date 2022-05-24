import Repository from '../Repository'


export interface IGetClusterArguments {
  identifier: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-24
 */
class ClusterRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * Will return all needed information about a cluster.
   *
   * request url: /kapi/v1//v1/{application}/cluster
   * request method: GET
   *
   * @param application
   * @param {Object} args
   * @param {String} args.identifier 
   */
  async getCluster(application, args: IGetClusterArguments): Promise<any> {
    const route = { path: '/v1/{application}/cluster', method: 'GET', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['identifier']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default ClusterRepository
