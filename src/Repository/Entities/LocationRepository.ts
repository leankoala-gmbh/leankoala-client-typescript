import Repository from '../Repository'



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2023-04-13
 */
class LocationRepository extends Repository {

  constructor() {
    super()
    this.connectionType = 'ClusterConnection'
  }

  /**
   * Return the maximum number of components that can be added to the given system.
   * request url: /kapi/v1/project/location/list
   * request method: GET
   *
   * @param {Object} args
   */
  async list(): Promise<any> {
    const route = { path: 'project/location/list', method: 'GET', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

}

export default LocationRepository
