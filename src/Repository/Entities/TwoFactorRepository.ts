import Repository from '../Repository'


export interface IIsTwoFactorRequiredArguments {
  action: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2024-04-03
 */
class TwoFactorRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Check if two factor authentication is required for action.
   *
   * request url: /kapi/v1/auth/2fa/is-required
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.action 
   */
  async isTwoFactorRequired(args: IIsTwoFactorRequiredArguments): Promise<any> {
    const route = { path: 'auth/2fa/is-required', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['action']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default TwoFactorRepository
