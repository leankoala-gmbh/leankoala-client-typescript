import Repository from '../Repository'


export interface IGetChangedConfigurationArguments {
  newerThan: number
  minifyOutput?: boolean
}

export interface IOverwriteArguments {
  errors_in_a_row?: number
  success_in_a_row?: number
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class ToolRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Get the tool configurations for all tools that changed.
   *
   * request url: /kapi/v1/check/tools/changed
   * request method: POST
   *
   * @param {Object} args
   * @param {Number} args.newerThan 
   * @param {Boolean} args.minifyOutput  (default: false)
   */
  async getChangedConfiguration(args: IGetChangedConfigurationArguments): Promise<any> {
    const route = { path: 'check/tools/changed', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['newerThan']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return all tools for the given project.
   *
   * request url: /kapi/v1/check/tools/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   */
  async findByProject(project): Promise<any> {
    const route = { path: 'check/tools/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Get the tool configuration.
   *
   * request url: /kapi/v1/check/tools/{project}/{toolIdentifier}
   * request method: GET
   *
   * @param project
   * @param toolIdentifier
   * @param {Object} args
   */
  async getConfiguration(project, toolIdentifier): Promise<any> {
    const route = { path: 'check/tools/{project}/{toolIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ project, toolIdentifier }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Overwrite tool configuration.
   *
   * request url: /kapi/v1/check/tools/{project}/{toolIdentifier}
   * request method: PUT
   *
   * @param project
   * @param toolIdentifier
   * @param {Object} args
   * @param {Number} args.errors_in_a_row Number of errors in a row before marked as failure (optional)
   * @param {Number} args.success_in_a_row Number of successes in a row before marked as passed (optional)
   */
  async overwrite(project, toolIdentifier, args: IOverwriteArguments): Promise<any> {
    const route = { path: 'check/tools/{project}/{toolIdentifier}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, toolIdentifier }, args)

    return this.connection.send(route, argList)
  }

}

export default ToolRepository
