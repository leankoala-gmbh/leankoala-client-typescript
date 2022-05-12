import Repository from '../Repository'


export interface IAddByChecklistArguments {
  checklist: any
  clear_before?: boolean
  activate_checks?: boolean
}

export interface IAddByRecipeArguments {
  component: number
  cookbook: number
}

export interface IShowCollectionsArguments {
  group?: string
}

export interface IShowActiveCollectionsArguments {
  group?: string
}

export interface IUpdateCollectionsArguments {
  collections?: any[]
  group?: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class CheckRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * request url: /kapi/v1/check/checks/{system}/checklist
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {*} args.checklist 
   * @param {Boolean} args.clear_before  (default: true)
   * @param {Boolean} args.activate_checks  (default: false)
   */
  async addByChecklist(system, args: IAddByChecklistArguments): Promise<any> {
    const route = { path: 'check/checks/{system}/checklist', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['checklist']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/check/checks/cookbook
   * request method: POST
   *
   * @param {Object} args
   * @param {Number} args.component 
   * @param {Number} args.cookbook 
   */
  async addByRecipe(args: IAddByRecipeArguments): Promise<any> {
    const route = { path: 'check/checks/cookbook', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['component', 'cookbook']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Run checks defined by tool identifier for all components within this system.
   *
   * request url: /kapi/v1/check/checks/run/{system}/{toolIdentifier}
   * request method: POST
   *
   * @param system
   * @param toolIdentifier
   * @param {Object} args
   */
  async runChecksForSystem(system, toolIdentifier): Promise<any> {
    const route = { path: 'check/checks/run/{system}/{toolIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, toolIdentifier }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return a list of collections for the given project.
   *
   * request url: /kapi/v1/check/collections/{project}/{toolIdentifier}
   * request method: POST
   *
   * @param project
   * @param toolIdentifier
   * @param {Object} args
   * @param {String} args.group The collection group. It is used to specify the collections. (default: )
   */
  async showCollections(project, toolIdentifier, args: IShowCollectionsArguments): Promise<any> {
    const route = { path: 'check/collections/{project}/{toolIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ project, toolIdentifier }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Return a list of active collections for the given system.
   *
   * request url: /kapi/v1/check/collections/system/active/{system}/{toolIdentifier}
   * request method: POST
   *
   * @param system
   * @param toolIdentifier
   * @param {Object} args
   * @param {String} args.group The collection group. It is used to specify the collections. (default: )
   */
  async showActiveCollections(system, toolIdentifier, args: IShowActiveCollectionsArguments): Promise<any> {
    const route = { path: 'check/collections/system/active/{system}/{toolIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, toolIdentifier }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Update the collections. WARNING: will delete the current collection connections and create new.
   *
   * request url: /kapi/v1/check/collections/system/{system}
   * request method: PUT
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.collections  (optional)
   * @param {String} args.group The collection group. It is used to specify the collections. (default: )
   */
  async updateCollections(system, args: IUpdateCollectionsArguments): Promise<any> {
    const route = { path: 'check/collections/system/{system}', method: 'PUT', version: 1 }
    const argList = Object.assign({ system }, args)

    return this.connection.send(route, argList)
  }

}

export default CheckRepository
