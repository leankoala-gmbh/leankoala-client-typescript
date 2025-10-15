import Repository from '../Repository'


export interface ISearchArguments {
  user: number
  with_next_full_run?: boolean
  with_onboarding_status?: boolean
  with_features?: boolean
  with_memories?: boolean
  owned_by_user?: boolean
  filter_empty_projects?: boolean
}

export interface IDeleteArguments {
  cancel_subscription?: boolean
}

export interface IUpdateArguments {
  name: string
  location?: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2025-10-15
 */
class ProjectRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * This endpoint will return a detailed onboarding status.
   *
   * request url: /kapi/v1/project/{project}/onboarding/status
   * request method: POST
   *
   * @param project
   * @param {Object} args
   */
  async getStatus(project): Promise<any> {
    const route = { path: 'project/{project}/onboarding/status', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all projects and the user roles for a given user.
   *
   * request url: /kapi/v1/project/projects/search
   * request method: POST
   *
   * @param {Object} args
   * @param {Number} args.user The users id
   * @param {Boolean} args.with_next_full_run If true the next approximated hourly run will be returned;
   *                                          the value is the time in seconds till the next run (default: false)
   * @param {Boolean} args.with_onboarding_status If true the projects onboarding status is added to the
   *                                              response. (default: false)
   * @param {Boolean} args.with_features If true the projects marketplace features are added to the
   *                                     response. (default: false)
   * @param {Boolean} args.with_memories If true the projects memories are added to the response. (default: false)
   * @param {Boolean} args.owned_by_user If true the only projects owned by this user are returned. (default: false)
   * @param {Boolean} args.filter_empty_projects If true the only projects with systems are returned (default: false)
   */
  async search(args: ISearchArguments): Promise<any> {
    const route = { path: 'project/projects/search', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['user']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return all projects and the user roles for a given user.
   *
   * request url: /kapi/v1/project/{providerIdentifier}/all
   * request method: GET
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async searchAll(providerIdentifier): Promise<any> {
    const route = { path: 'project/{providerIdentifier}/all', method: 'GET', version: 1 }
    const argList = Object.assign({ providerIdentifier }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Delete the given project.
   *
   * request url: /kapi/v1/project/projects/{project}
   * request method: DELETE
   *
   * @param project
   * @param {Object} args
   * @param {Boolean} args.cancel_subscription If true cancel the corresponding subscription. (default: false)
   */
  async delete(project, args: IDeleteArguments): Promise<any> {
    const route = { path: 'project/projects/{project}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ project }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Update the given project.
   *
   * request url: /kapi/v1/project/projects/{project}
   * request method: PUT
   *
   * @param project
   * @param {Object} args
   * @param {String} args.name 
   * @param {String} args.location The location the project should be monitored from (optional)
   */
  async update(project, args: IUpdateArguments): Promise<any> {
    const route = { path: 'project/projects/{project}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['name']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return all users for the given project.
   *
   * request url: /kapi/v1/project/users/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getUsers(project): Promise<any> {
    const route = { path: 'project/users/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Remove a given user from the project.
   *
   * request url: /kapi/v1/project/users/{project}/{user}
   * request method: DELETE
   *
   * @param project
   * @param user
   * @param {Object} args
   */
  async removeUser(project, user): Promise<any> {
    const route = { path: 'project/users/{project}/{user}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ project, user }, {})

    return this.connection.send(route, argList)
  }

}

export default ProjectRepository
