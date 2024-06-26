import Repository from '../Repository'


export interface ICreateSystemArguments {
  project?: number
  add_standard_alerting?: boolean
  name: string
  base_url: string
  owner: number
  system_type: number
  system_size: number
  add_checklist_checks?: boolean
  add_support_user?: boolean
  location?: string
}

export interface IUpdateSystemArguments {
  name?: string
  base_url?: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class SystemRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Create a new system.
   *
   * request url: /kapi/v1/project/systems/system
   * request method: POST
   *
   * @param {Object} args
   * @param {Number} args.project The project the system should be part of. If the project is not set a
   *                               new project will be created with the systems name. (optional)
   * @param {Boolean} args.add_standard_alerting If true add a standard channel and alerting policy for
   *                                             the owner. (default: false)
   * @param {String} args.name The shops name.
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain.
   * @param {Number} args.owner The shops owner (id).
   * @param {Number} args.system_type The shops system type (id).
   * @param {Boolean} args.add_checklist_checks If true all checks of the checklist connected to the main
   *                                            system type are added. (default: true)
   * @param {Boolean} args.add_support_user Add the support user for support requests (default: true)
   */
  async createSystem(args: ICreateSystemArguments): Promise<any> {
    const route = { path: 'project/systems/system', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['name', 'base_url', 'owner', 'system_type']
    this._assertValidArguments(requiredArguments, argList)

    const result = await this.connection.send(route, argList)
    await this.connection.refreshAccessToken(true)
    return result
  }

  /**
   * Update an existing system.
   *
   * request url: /kapi/v1/project/systems/system/{system}
   * request method: PUT
   *
   * @param system
   * @param {Object} args
   * @param {String} args.name The shops name. (optional)
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain. (optional)
   */
  async updateSystem(system, args: IUpdateSystemArguments): Promise<any> {
    const route = { path: 'project/systems/system/{system}', method: 'PUT', version: 1 }
    const argList = Object.assign({ system }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Return all components for the given system.
   *
   * request url: /kapi/v1/project/systems/{system}/components
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getComponents(system): Promise<any> {
    const route = { path: 'project/systems/{system}/components', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all suggested component types for the given system.
   *
   * request url: /kapi/v1/project/systems/{system}/suggestions
   * request method: POST
   *
   * @param system
   * @param {Object} args
   */
  async getComponentSuggestions(system): Promise<any> {
    const route = { path: 'project/systems/{system}/suggestions', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Set the last full run timestamp on a system.
   *
   * request url: /kapi/v1/project/systems/{system}/lastFullRun/{status}
   * request method: POST
   *
   * @param system
   * @param status
   * @param {Object} args
   */
  async changeLastFullRun(system, status): Promise<any> {
    const route = { path: 'project/systems/{system}/lastFullRun/{status}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, status }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return the approximated time in seconds when the next full check run is triggered.
   *
   * request url: /kapi/v1/project/systems/{system}/nextFullRun
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getNextLastFullRun(system): Promise<any> {
    const route = { path: 'project/systems/{system}/nextFullRun', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all system types for the given provider.
   *
   * request url: /kapi/v1/project/systems/{providerIdentifier}/systemType
   * request method: GET
   *
   * @param providerIdentifier
   * @param {Object} args
   * @param system_size The system size id. (optional)
   */
  async getSystemTypes(providerIdentifier, system_size): Promise<any> {
    const route = { path: 'project/systems/{providerIdentifier}/systemType', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier, system_size }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return the maximum number of components that can be added to the given system.
   *
   * request url: /kapi/v1/project/systems/{system}/component/limit
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getComponentLimit(system): Promise<any> {
    const route = { path: 'project/systems/{system}/component/limit', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Trigger the component finder for a given system.
   *
   * request url: /kapi/v1/project/{project}/componentfinder/{system}/{user}/trigger
   * request method: POST
   *
   * @param project
   * @param system
   * @param user
   * @param {Object} args
   */
  async triggerComponentFinder(project, system, user): Promise<any> {
    const route = { path: 'project/{project}/componentfinder/{system}/{user}/trigger', method: 'POST', version: 1 }
    const argList = Object.assign({ project, system, user }, {})

    return this.connection.send(route, argList)
  }

}

export default SystemRepository
