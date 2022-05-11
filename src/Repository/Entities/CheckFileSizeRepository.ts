const Repository = require('../Repository')


export interface IIgnorePatternArguments {
  patterns: list
}



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-11
 */
class CheckFileSizeRepository extends Repository {

  /**
   * request url: /kapi/v1/check/checks/{system}/performance/big
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getResults(system): Promise<any> {
    const route = { path: 'check/checks/{system}/performance/big', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Add a new ignore pattern to the configuration.
   *
   * request url: /kapi/v1/check/checks/{system}/siteinfo/ignore
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.patterns List of URLs (strings) that will be excluded from the dead link crawl
   */
  async ignorePattern(system, args: IIgnorePatternArguments): Promise<any> {
    const route = { path: 'check/checks/{system}/siteinfo/ignore', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['patterns']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = CheckFileSizeRepository
