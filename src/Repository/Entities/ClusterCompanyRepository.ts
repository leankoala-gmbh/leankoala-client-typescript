const Repository = require('../Repository')


export interface ICreateArguments {
  name: string
  master_id: number
}

export interface IExistsArguments {
  company_name: string
}

export interface ISearchArguments {
  company_name: string
}

export interface IConnectUserArguments {
  user_role?: number
}

export interface IUpdateMasterIdArguments {
  master_id: number
}



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-11
 */
class ClusterCompanyRepository extends Repository {

  /**
   * Create a new company
   *
   * request url: /kapi/v1/user/companies/{providerIdentifier}
   * request method: POST
   *
   * @param providerIdentifier
   * @param {Object} args
   * @param {String} args.name The companies name
   * @param {Number} args.master_id The master id from the auth2 server
   */
  async create(providerIdentifier, args: ICreateArguments): Promise<any> {
    const route = { path: 'user/companies/{providerIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)
    const requiredArguments = ['name', 'master_id']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Check if the given company name already exists
   *
   * request url: /kapi/v1/user/companies/exists
   * request method: GET
   *
   * @param {Object} args
   * @param {String} args.company_name The companies name
   */
  async exists(, args: IExistsArguments): Promise<any> {
    const route = { path: 'user/companies/exists', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['company_name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Search for a given company by provider and name
   *
   * request url: /kapi/v1/user/companies/search/{providerIdentifier}
   * request method: POST
   *
   * @param providerIdentifier
   * @param {Object} args
   * @param {String} args.company_name The companies name
   */
  async search(providerIdentifier, args: ISearchArguments): Promise<any> {
    const route = { path: 'user/companies/search/{providerIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)
    const requiredArguments = ['company_name']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * Return a list of all companies for the given provider.
   *
   * request url: /kapi/v1/user/companies/findall/{providerIdentifier}
   * request method: POST
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async findAll(providerIdentifier): Promise<any> {
    const route = { path: 'user/companies/findall/{providerIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, args)

    return this._connection.send(route, argList)
  }

  /**
   * Connect a given user to a company
   *
   * request url: /kapi/v1/user/companies/connect/{company}/{user}
   * request method: POST
   *
   * @param company
   * @param user
   * @param {Object} args
   * @param {Number} args.user_role The users company role (default: 1000)
   */
  async connectUser(company, user, args: IConnectUserArguments): Promise<any> {
    const route = { path: 'user/companies/connect/{company}/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ company, user }, args)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint updates an existing companies master id.
   *
   * request url: /kapi/v1/user/companies/{company}/masterId
   * request method: PUT
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.master_id The users master id.
   */
  async updateMasterId(company, args: IUpdateMasterIdArguments): Promise<any> {
    const route = { path: 'user/companies/{company}/masterId', method: 'PUT', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['master_id']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

}

module.exports = ClusterCompanyRepository
