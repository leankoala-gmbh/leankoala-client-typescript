import Repository from '../Repository'


export interface ICreateArguments {
  name: string
  interval?: 'immediately' | '7d' | '24h' | '1h'
  severities?: any[]
  channels?: number
}

export interface IUpdateArguments {
  name?: string
  interval?: 'immediately' | '7d' | '24h' | '1h'
  severities?: any[]
  channels?: number
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class AlertingPolicyRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * List all policies for the given project
   *
   * request url: /kapi/v1/alerting/policies/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async list(project): Promise<any> {
    const route = { path: 'alerting/policies/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/alerting/policies/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name 
   * @param {String} args.interval  (default: immediately)
   * @param {Array} args.severities  (optional)
   * @param {Number} args.channels  (optional)
   */
  async create(project, args: ICreateArguments): Promise<any> {
    const route = { path: 'alerting/policies/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Delete the given policy
   *
   * request url: /kapi/v1/alerting/policies/{project}/{policy}
   * request method: DELETE
   *
   * @param project
   * @param policy
   * @param {Object} args
   */
  async delete(project, policy): Promise<any> {
    const route = { path: 'alerting/policies/{project}/{policy}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ project, policy }, {})

    return this.connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/alerting/policies/{project}/{policy}
   * request method: PUT
   *
   * @param project
   * @param policy
   * @param {Object} args
   * @param {String} args.name  (optional)
   * @param {String} args.interval  (optional)
   * @param {Array} args.severities  (optional)
   * @param {Number} args.channels  (optional)
   */
  async update(project, policy, args: IUpdateArguments): Promise<any> {
    const route = { path: 'alerting/policies/{project}/{policy}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, policy }, args)

    return this.connection.send(route, argList)
  }

}

export default AlertingPolicyRepository
