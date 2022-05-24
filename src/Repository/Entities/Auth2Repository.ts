import Repository from '../Repository'


export interface ILoginWithCredentialsArguments {
  emailOrUserName: string
  password: string
  withMemories?: boolean
}

export interface ICreateTokenByRefreshTokenArguments {
  with_memories?: boolean
}

export interface ICreateTokenArguments {
  with_memories?: boolean
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-24
 */
class Auth2Repository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * request url: /kapi/v1//v1/{application}/auth/login
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {String} args.emailOrUserName 
   * @param {String} args.password 
   * @param {Boolean} args.withMemories If true all Memory entities will be attached in the answer. (default: false)
   */
  async loginWithCredentials(application, args: ILoginWithCredentialsArguments): Promise<any> {
    const route = { path: '/v1/{application}/auth/login', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['emailOrUserName', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Create a valid access token by the given refresh token.
   *
   * request url: /kapi/v1//v1/{application}/auth/refresh/{user}
   * request method: POST
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createTokenByRefreshToken(application, user, args: ICreateTokenByRefreshTokenArguments): Promise<any> {
    const route = { path: '/v1/{application}/auth/refresh/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Create a valid access token.
   *
   * request url: /kapi/v1//v1/{application}/auth/token/{user}
   * request method: POST
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createToken(application, user, args: ICreateTokenArguments): Promise<any> {
    const route = { path: '/v1/{application}/auth/token/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this.connection.send(route, argList)
  }

}

export default Auth2Repository
