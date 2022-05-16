import Repository from '../Repository'


export interface ISearchArguments {
  system?: number
}

export interface ISinceArguments {
  days: number
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class IncidentRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Find all open incidents for the given company.
   *
   * request url: /kapi/v1/incident/incidents/company/{company}/search
   * request method: POST
   *
   * @param company
   * @param {Object} args
   */
  async findByCompany(company): Promise<any> {
    const route = { path: 'incident/incidents/company/{company}/search', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Find all open incidents for the given project. Optionally it can be filtered by system.
   *
   * request url: /kapi/v1/incident/incidents/{project}/search
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.system the system filter (optional)
   */
  async search(project, args: Partial<ISearchArguments> = {}): Promise<any> {
    const route = { path: 'incident/incidents/{project}/search', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Find all incidents that where open in the last days.
   *
   * request url: /kapi/v1/incident/incidents/{project}/since
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.days The number of days the incidents can old
   */
  async since(project, args: ISinceArguments): Promise<any> {
    const route = { path: 'incident/incidents/{project}/since', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['days']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Find a single incident by id
   *
   * request url: /kapi/v1/incident/incidents/{project}/{incident}
   * request method: GET
   *
   * @param project
   * @param incident
   * @param {Object} args
   */
  async find(project, incident): Promise<any> {
    const route = { path: 'incident/incidents/{project}/{incident}', method: 'GET', version: 1 }
    const argList = Object.assign({ project, incident }, {})

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint returns the the configuration (errors_in_a_row, success_in_a_row) of all tools in the
   * given project. It also handles tool inheritance.
   *
   * request url: /kapi/v1/incident/tools/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getConfig(project): Promise<any> {
    const route = { path: 'incident/tools/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

}

export default IncidentRepository
