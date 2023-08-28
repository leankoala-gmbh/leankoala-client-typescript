import Repository from '../Repository'


export interface IActivateArguments {
  activation_key: string
}

export interface IProviderActivateArguments {
  master_id: number
}

export interface ICreateArguments {
  username?: string
  master_id?: number
  suppress_activation?: boolean
  activate?: boolean
  email: string
  preferred_language?: string
  company_id?: number
  create_company?: boolean
  full_name?: string
  first_name?: string
  last_name?: string
  password: string
  _attributes?: any[]
}

export interface ISetPreferredLanguageArguments {
  language: string
}

export interface IConnectOAuthAccountArguments {
  provider: 'haendlerbund' | 'google'
  provider_user_id: string
}

export interface IChangePasswordArguments {
  password_new: string
}

export interface IExistsArguments {
  query: any[]
}

export interface IFindArguments {
  query: any[]
}

export interface IDeleteByEmailArguments {
  email: string
}

export interface IUpdateUserArguments {
  email?: string
  preferred_language?: string
  company_id?: number
  first_name?: string
  last_name?: string
}

export interface IUpdateMasterIdArguments {
  master_id: number
}

export interface IRequestPasswordResetArguments {
  email: string
}

export interface IResetPasswordArguments {
  password: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2023-08-28
 */
class ClusterUserRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Activate an user account. The endpoint will return a valid access and refresh token so the user can
   * be logged in without re-entering username and password.
   *
   * request url: /kapi/v1/user/users/activate
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.activation_key 
   */
  async activate(args: IActivateArguments): Promise<any> {
    const route = { path: 'user/users/activate', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['activation_key']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Activate a user account by provider admin.
   *
   * request url: /kapi/v1/user/users/{provider}/activate
   * request method: POST
   *
   * @param provider
   * @param {Object} args
   * @param {Number} args.master_id The master_id user.
   */
  async providerActivate(provider, args: IProviderActivateArguments): Promise<any> {
    const route = { path: 'user/users/{provider}/activate', method: 'POST', version: 1 }
    const argList = Object.assign({ provider }, args)
    const requiredArguments = ['master_id']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint creates a new user. The given provider (url param) will be attached.
   *
   * request url: /kapi/v1/user/users/{provider}
   * request method: POST
   *
   * @param provider
   * @param {Object} args
   * @param {String} args.username The new users name. (optional)
   * @param {Number} args.master_id The users id on the master server. (default: -1)
   * @param {Boolean} args.suppress_activation If true no activation mail will be send.. (default: false)
   * @param {Boolean} args.activate If true no activation mail will be send.. (default: true)
   * @param {String} args.email The email address of the new user.
   * @param {String} args.preferred_language The users preferred interface language. (optional)
   * @param {Number} args.company_id The companies numeric id of the new user. (optional)
   * @param {Boolean} args.create_company Create a new company if none exists. (default: false)
   * @param {String} args.full_name The users full name. (optional)
   * @param {String} args.first_name The users first name. (optional)
   * @param {String} args.last_name The users last name. (optional)
   * @param {String} args.password 
   * @param {Array} args._attributes Additional attributes for the user (default: [])
   */
  async create(provider, args: ICreateArguments): Promise<any> {
    const route = { path: 'user/users/{provider}', method: 'POST', version: 1 }
    const argList = Object.assign({ provider }, args)
    const requiredArguments = ['email', 'password']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Update the users preferred language.
   *
   * request url: /kapi/v1/user/users/preferredLanguage/{user}
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {String} args.language The users preferred interface language.
   */
  async setPreferredLanguage(user, args: ISetPreferredLanguageArguments): Promise<any> {
    const route = { path: 'user/users/preferredLanguage/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['language']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint connects an OAuth provider with the current user.
   *
   * request url: /kapi/v1/user/oauth/{user}/connect
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {*} args.provider The OAuth provider.
   * @param {String} args.provider_user_id The OAuth provider user id.
   */
  async connectOAuthAccount(user, args: IConnectOAuthAccountArguments): Promise<any> {
    const route = { path: 'user/oauth/{user}/connect', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['provider', 'provider_user_id']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Change the users password. This can only be done by the master server.
   *
   * request url: /kapi/v1/user/users/{user}/password
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {String} args.password_new 
   */
  async changePassword(user, args: IChangePasswordArguments): Promise<any> {
    const route = { path: 'user/users/{user}/password', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['password_new']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint returns true if a user exists that matches the given search criteria.
   *
   * request url: /kapi/v1/user/users/exists
   * request method: GET
   *
   * @param {Object} args
   * @param {Array} args.query The key value pairs for the search.
   */
  async exists(args: IExistsArguments): Promise<any> {
    const route = { path: 'user/users/exists', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['query']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint returns a user that matches the given search criteria.
   *
   * request url: /kapi/v1/user/users/find
   * request method: GET
   *
   * @param {Object} args
   * @param {Array} args.query The key value pairs for the search.
   */
  async find(args: IFindArguments): Promise<any> {
    const route = { path: 'user/users/find', method: 'GET', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['query']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Delete the given user and all owned projects.
   *
   * request url: /kapi/v1/user/users/{user}
   * request method: DELETE
   *
   * @param user
   * @param {Object} args
   */
  async delete(user): Promise<any> {
    const route = { path: 'user/users/{user}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ user }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Checks if the user can be deleted.
   *
   * request url: /kapi/v1/user/users/deletable/{user}
   * request method: POST
   *
   * @param user
   * @param {Object} args
   */
  async isDeletable(user): Promise<any> {
    const route = { path: 'user/users/deletable/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, {})

    return this.connection.send(route, argList)
  }

  /**
   *  the given user (by email) and all owned projects.
   *
   * request url: /kapi/v1/user/users/delete/email
   * request method: DELETE
   *
   * @param {Object} args
   * @param {String} args.email The users email address
   */
  async deleteByEmail(args: IDeleteByEmailArguments): Promise<any> {
    const route = { path: 'user/users/delete/email', method: 'DELETE', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint updates an existing user.
   *
   * request url: /kapi/v1/user/users/{user}
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {String} args.email The email address of the new user. (optional)
   * @param {String} args.preferred_language The users preferred interface language. (optional)
   * @param {Number} args.company_id The companies numeric id of the new user. (optional)
   * @param {String} args.first_name The users first name. (optional)
   * @param {String} args.last_name The users last name. (optional)
   */
  async updateUser(user, args: IUpdateUserArguments): Promise<any> {
    const route = { path: 'user/users/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)

    return this.connection.send(route, argList)
  }

  /**
   * This endpoint updates an existing users master id.
   *
   * request url: /kapi/v1/user/users/{user}/masterId
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {Number} args.master_id The users master id.
   */
  async updateMasterId(user, args: IUpdateMasterIdArguments): Promise<any> {
    const route = { path: 'user/users/{user}/masterId', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['master_id']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Request password change e-mail.
   *
   * request url: /kapi/v1/user/users/password/reset/request
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.email The users email address
   */
  async requestPasswordReset(args: IRequestPasswordResetArguments): Promise<any> {
    const route = { path: 'user/users/password/reset/request', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Reset the password.
   *
   * request url: /kapi/v1/user/users/password/reset/{user}
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {String} args.password The new password
   */
  async resetPassword(user, args: IResetPasswordArguments): Promise<any> {
    const route = { path: 'user/users/password/reset/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['password']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return a list of all users for the given company.
   *
   * request url: /kapi/v1/user/users/find/all/{providerIdentifier}
   * request method: POST
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async findAll(providerIdentifier): Promise<any> {
    const route = { path: 'user/users/find/all/{providerIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, {})

    return this.connection.send(route, argList)
  }

}

export default ClusterUserRepository
