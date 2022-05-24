import Repository from '../Repository'


export interface ICreateUserArguments {
  email: string
  password: string
  company?: number
  fullName?: any
  firstName?: string
  lastName?: string
  suppressActivation?: boolean
  handleDoubleRegistration?: boolean
  activate?: boolean
  threeSixtyId?: string
  _attributes?: any[]
}

export interface IUpdateUserArguments {
  email?: string
  preferred_language?: string
  company_id?: number
  first_name?: string
  last_name?: string
}

export interface ISetPreferredLanguageArguments {
  language: string
}

export interface IChangePasswordArguments {
  password_old: string
  password_new: string
}

export interface IResetPasswordArguments {
  password: string
}

export interface IRequestPasswordResetArguments {
  email: string
}

export interface IActivateArguments {
  activation_key: string
}

export interface IFindArguments {
  query: any[]
}

export interface IConnectAuthAccountArguments {
  provider: 'haendlerbund' | 'google' | '360'
  providerUserId: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-24
 */
class UserRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'MasterConnection'
    }

  /**
   * This endpoint creates a new user.
   *
   * request url: /{application}/user
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {String} args.email 
   * @param {String} args.password 
   * @param {Number} args.company  (optional)
   * @param {*} args.fullName The users full name. (optional)
   * @param {String} args.firstName The users first name. (optional)
   * @param {String} args.lastName The users last name. (optional)
   * @param {Boolean} args.suppressActivation If set to true no activation mail will be send. (default: false)
   * @param {Boolean} args.handleDoubleRegistration If set to false no double registration mail will be
   *                                                send. (default: true)
   * @param {Boolean} args.activate Activate the user immediately. (default: false)
   * @param {String} args.threeSixtyId If this user is a Plesk 360 user the 360 id is mandatory. (optional)
   * @param {Array} args._attributes Additional attributes for the user (default: [])
   */
  async createUser(application, args: ICreateUserArguments): Promise<any> {
    const route = { path: '/{application}/user', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['email', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint deletes a user.
   *
   * request url: /{application}/user/{user}
   * request method: DELETE
   *
   * @param application
   * @param user
   * @param {Object} args
   */
  async deleteUser(application, user): Promise<any> {
    const route = { path: '/{application}/user/{user}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ application, user }, {})

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint updates an existing user.
   *
   * request url: /{application}/user/{user}
   * request method: PUT
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.email The email address of the new user. (optional)
   * @param {String} args.preferred_language The users preferred interface language. (optional)
   * @param {Number} args.company_id The companies numeric id of the new user. (optional)
   * @param {String} args.first_name The users first name. (optional)
   * @param {String} args.last_name The users last name. (optional)
   */
  async updateUser(application, user, args: IUpdateUserArguments): Promise<any> {
    const route = { path: '/{application}/user/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Update the users preferred language.
   *
   * request url: /{application}/user/{user}/language
   * request method: PUT
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.language The users preferred interface language.
   */
  async setPreferredLanguage(application, user, args: ISetPreferredLanguageArguments): Promise<any> {
    const route = { path: '/{application}/user/{user}/language', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['language']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Change the users password.
   *
   * request url: /{application}/user/{user}/password
   * request method: PUT
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.password_old 
   * @param {String} args.password_new 
   */
  async changePassword(application, user, args: IChangePasswordArguments): Promise<any> {
    const route = { path: '/{application}/user/{user}/password', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['password_old', 'password_new']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Checks if the user can be deleted.
   *
   * request url: /{application}/user/{user}/deletable/{company}
   * request method: POST
   *
   * @param application
   * @param user
   * @param company
   * @param {Object} args
   */
  async isDeletable(application, user, company): Promise<any> {
    const route = { path: '/{application}/user/{user}/deletable/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user, company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Reset the password.
   *
   * request url: /{application}/user/{user}/password/reset
   * request method: PUT
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {String} args.password The new password
   */
  async resetPassword(application, user, args: IResetPasswordArguments): Promise<any> {
    const route = { path: '/{application}/user/{user}/password/reset', method: 'PUT', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['password']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Request password change e-mail.
   *
   * request url: /{application}/user/password/request
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {String} args.email The users email address
   */
  async requestPasswordReset(application, args: IRequestPasswordResetArguments): Promise<any> {
    const route = { path: '/{application}/user/password/request', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Activate an user account. The endpoint will return a valid access and refresh token so the user can
   * be logged in without re-entering username and password.
   *
   * request url: /{application}/user/activate
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {String} args.activation_key 
   */
  async activate(application, args: IActivateArguments): Promise<any> {
    const route = { path: '/{application}/user/activate', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['activation_key']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint returns a user that matches the given search criteria.
   *
   * request url: /{application}/user/find
   * request method: POST
   *
   * @param application
   * @param {Object} args
   * @param {Array} args.query The key value pairs for the search.
   */
  async find(application, args: IFindArguments): Promise<any> {
    const route = { path: '/{application}/user/find', method: 'POST', version: 1 }
    const argList = Object.assign({ application }, args)
    const requiredArguments = ['query']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint connects an OAuth provider with the current user.
   *
   * request url: /{application}/user/{user}/connect
   * request method: POST
   *
   * @param application
   * @param user
   * @param {Object} args
   * @param {*} args.provider The OAuth provider.
   * @param {String} args.providerUserId The OAuth provider user id.
   */
  async connectAuthAccount(application, user, args: IConnectAuthAccountArguments): Promise<any> {
    const route = { path: '/{application}/user/{user}/connect', method: 'POST', version: 1 }
    const argList = Object.assign({ application, user }, args)
    const requiredArguments = ['provider', 'providerUserId']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default UserRepository
