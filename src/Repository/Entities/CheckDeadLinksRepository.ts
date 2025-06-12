import Repository from '../Repository'


export interface IIgnorePatternArguments {
  patterns: any[]
}

export interface IUnignorePatternArguments {
  pattern_id?: number
  pattern_ids?: any[]
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2025-06-12
 */
class CheckDeadLinksRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Return a list of dead links for every component attached to the given system.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system): Promise<any> {
    const route = { path: 'check/checks/{system}/deadlinks', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return a list of dead links for every component in every project owned by the company.
   *
   * request url: /kapi/v1/check/checks/company/{company}/deadlinks
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getResultsByCompany(company): Promise<any> {
    const route = { path: 'check/checks/company/{company}/deadlinks', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return the dead link check configuration for the given system.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks/config
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getConfiguration(system): Promise<any> {
    const route = { path: 'check/checks/{system}/deadlinks/config', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Add a new ignore pattern to the configuration.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks/ignore
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.patterns List of URLs (strings) that will be excluded from the dead link crawl
   */
  async ignorePattern(system, args: IIgnorePatternArguments): Promise<any> {
    const route = { path: 'check/checks/{system}/deadlinks/ignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['patterns']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Remove an ignore pattern from the configuration.
   *
   * request url: /kapi/v1/check/checks/{system}/deadlinks/unignore
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {Number} args.pattern_id Single URL that will not be excluded anymore in the dead link crawl (optional)
   * @param {Array} args.pattern_ids List of URLs that will not be excluded anymore from the dead link
   *                                crawl (optional)
   */
  async unignorePattern(system, args: IUnignorePatternArguments): Promise<any> {
    const route = { path: 'check/checks/{system}/deadlinks/unignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Return a list patterns that should be blocked in the dead link checker.
   * request url: /kapi/v1/check/checks/deadlinks/blocked
   * request method: GET
   *
   * @param {Object} args
   */
  async getBlockedPatterns(): Promise<any> {
    const route = { path: 'check/checks/deadlinks/blocked', method: 'GET', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

}

export default CheckDeadLinksRepository
