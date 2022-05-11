const Repository = require('../Repository')


export interface ICreateWebsiteMonitorArguments {
  url: string
}



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-11
 */
class NixstatsRepository extends Repository {

  /**
   * Create a new 360 website monitor.
   *
   * request url: /kapi/v1/check/nixtstats/{company}/monitor/website
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {String} args.url 
   */
  async createWebsiteMonitor(company, args: ICreateWebsiteMonitorArguments): Promise<any> {
    const route = { path: 'check/nixtstats/{company}/monitor/website', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['url']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = NixstatsRepository
