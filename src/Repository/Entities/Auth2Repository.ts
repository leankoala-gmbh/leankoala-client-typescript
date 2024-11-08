import Repository from '../Repository'


export interface ILoginWithCredentialsArguments {
  emailOrUserName: string
  password: string
  withMemories?: boolean
}

export interface ICreateTokenBySessionArguments {
  sessionToken?: string
  withMemories?: boolean
}

export interface ICreateTokenByRefreshTokenArguments {
  with_memories?: boolean
}

export interface ICreateTokenArguments {
  with_memories?: boolean
}

export interface ICreateTokenByConfirmCodeAndDeprecatedJwtArguments {
  deprecatedSessionToken: string
  confirmationCode: string
  withMemories?: boolean
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2024-11-08
 */
class Auth2Repository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * request url: /{application}/auth/login
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {String} args.emailOrUserName 
   * @param {String} args.password 
   * @param {Boolean} args.withMemories If true all Memory entities will be attached in the answer. (default: false)
   */
  async loginWithCredentials(application, args: ILoginWithCredentialsArguments): Promise<any> {
    const route = { path: '/{application}/auth/login', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['emailOrUserName', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Create a valid access token by the given refresh token.
   *
   * request url: /{application}/auth/session
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {String} args.sessionToken  (optional)
   * @param {Boolean} args.withMemories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createTokenBySession(application, args: ICreateTokenBySessionArguments): Promise<any> {
    const route = { path: '/{application}/auth/session', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Create a valid access token by the given refresh token.
   *
   * request url: /{application}/auth/refresh/{user}
   * request method: POST
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createTokenByRefreshToken(application, user, args: ICreateTokenByRefreshTokenArguments): Promise<any> {
    const route = { path: '/{application}/auth/refresh/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Create a valid access token.
   *
   * request url: /{application}/auth/token/{user}
   * request method: POST
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {Boolean} args.with_memories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createToken(application, user, args: ICreateTokenArguments): Promise<any> {
    const route = { path: '/{application}/auth/token/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Create a valid read-only refresh token by the given refresh token.
   *
   * request url: /{application}/auth/read-only-token/{user}
   * request method: POST
   *
   * @param application
   * @param user
   * @param {Object} args
   */
  async createReadOnlyRefreshToken(application, user): Promise<any> {
    const route = { path: '/{application}/auth/read-only-token/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Create a valid access token by a confirmation code and the deprecated refresh token.
   *
   * request url: /{application}/auth/session-deprecated/confirm
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {String} args.deprecatedSessionToken The deprecated session token.
   * @param {String} args.confirmationCode The confirmation code i.e. from an email.
   * @param {Boolean} args.withMemories If true all Memory entities will be attached in the answer. (default: false)
   */
  async createTokenByConfirmCodeAndDeprecatedJwt(application, args: ICreateTokenByConfirmCodeAndDeprecatedJwtArguments): Promise<any> {
    const route = { path: '/{application}/auth/session-deprecated/confirm', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['deprecatedSessionToken', 'confirmationCode']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default Auth2Repository
