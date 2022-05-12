import Repository from '../Repository'

export interface ICreateTokenByCredentialsResult{
  user: { 
    company: { 
        subscription: { 
            trial_end? : number
      }
    }
    preferred_language? : string
  }
}


export interface ICreateTokenByCredentialsArguments {
  username: string
  password: string
  expire?: boolean
  with_memories?: boolean
}

export interface ICreateTokenByRefreshTokenArguments {
  with_memories?: boolean
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class AuthRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * request url: /kapi/v1/auth/tokens/access
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.username 
   * @param {String} args.password 
   * @param {Boolean} args.expire  (default: true)
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   *
   * @return ICreateTokenByCredentialsResult
   */
  async createTokenByCredentials(args: ICreateTokenByCredentialsArguments): Promise<ICreateTokenByCredentialsResult> {
    const route = { path: 'auth/tokens/access', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['username', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * request url: /kapi/v1/auth/tokens/refresh/{user}
   * request method: POST
   *
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createTokenByRefreshToken(user, args: ICreateTokenByRefreshTokenArguments): Promise<any> {
    const route = { path: 'auth/tokens/refresh/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, args)

    return this.connection.send(route, argList)
  }

}

export default AuthRepository
