import axios from 'axios'
import Connection from './Connection/Connection'

import RepositoryCollection from './Repository/RepositoryCollection'
import {TRepositories} from './typescript/interfaces/global/repos'
import {
  IClientConnectArgs,
  IInitConnectionArgs, IInitConnectionViaDeprecatedJwtAndConfirmCode,
  IInitConnectionViaMasterTokens,
  IInitConnectionViaWakeUpTokenArgs,
  ISwitchClusterArgs,
  ITokenObject,
} from './typescript/interfaces/360ApiClient.interface'
import {EEnvironment, EServer} from './Repository/Constants/Enviroment'
import BadRequestError from './Connection/BadRequestError'
import SessionConnector from './Connection/SessionConnector'
import MarketPlaceConsts from './Repository/Constants/Marketplace'
import RefreshTokenInvalidError from './Connection/RefreshTokenInvalidError'

/**
 * The KoalityEngine client is used to connect to an instance of the KoalityEngine
 * and process all needed tasks.
 *
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-05
 */
class LeankoalaClient {
  private _clusterConnection: any
  private _masterConnection: any
  private _user: any
  private _companies: any
  private _currentCompany: boolean
  private _axios: boolean
  private readonly _environment: string
  private _connectionStatus: string
  private readonly _registeredEventListeners: any
  private _masterToken: string | undefined
  private _repositoryCollection: RepositoryCollection
  private _masterUser: any
  private readonly _provider: string
  private _refreshToken: string | undefined
  private readonly _routes: {
    masterRefresh: { path: string; method: string; version: number }
    clusterRefresh: { path: string; method: string; version: number }
  }
  private readonly _headerMeta: any

  /**
   * Create a client and set the environment
   *
   * @param {String} environment the environment (development|production)
   * @param {String} provider the api provider
   */
  constructor(environment = 'production', provider = 'koality', headerMeta = {}) {
    this._repositoryCollection = new RepositoryCollection()
    this._clusterConnection = false
    this._masterConnection = false
    this._user = {}
    this._companies = {}
    this._currentCompany = false
    this._axios = false
    this._environment = environment
    this._connectionStatus = 'disconnected'
    this._registeredEventListeners = {}
    this._masterToken = ''
    this._provider = provider
    this._headerMeta = headerMeta
    this._routes = {
      masterRefresh: {
        version: 1,
        path: '{application}/auth/refresh/{user}',
        method: 'POST'
      },
      clusterRefresh: {
        version: 1,
        path: 'auth/tokens/refresh/{user_id}',
        method: 'POST'
      }
    }
  }

  /**
   * Connect to the API server and retrieve the JWT for later requests.
   *
   * @param {Object} args
   * @param {String} [args.username] the username for the user that should be logged in
   * @param {String} [args.password] the password for the given user
   * @param {String} [args.wakeUpToken] the wakeup token can be used to log in instead of username and password
   * @param {String} [args.accessToken] the token fill this in the client generator
   * @param {Boolean} [args.withMemories] return the users memory on connect
   * @param {String} [args.language] the preferred language (default: en; implemented: de, en)
   * @param {Object} [args.axiosAdapter] the preferred language (default: en; implemented: de, en)
   * @param {Object} [args.autoSelectCompany] auto select the company (and cluster) (default: false)
   *
   * @param {function} [args.axios] a predefined axios instance
   */
  async connect(args: IClientConnectArgs) {
    args.autoSelectCompany = args.autoSelectCompany || false
    this._connectionStatus = 'connecting'

    let result;

    try {
      this._repositoryCollection = new RepositoryCollection()
      result = await this._initConnection({...args, axios})
    } catch (error) {
      this._connectionStatus = 'disconnected'
      throw error
    }

    this._connectionStatus = 'connected'

    return result
  }

  /**
   * Return true if the client has valid and not expired refresh tokens.
   *
   * @return {boolean}
   */
  isConnected() {
    if (!this._masterConnection) return false

    return Math.floor(Date.now() / 1000) < this._masterConnection.getExpireDate()
  }

  public getEnvironment(): string {
    return this._environment
  }

  /**
   * Set the preferred language for the API results.
   *
   * The language can already be added when connecting.
   *
   * @param {String} language
   */
  setLanguage(language) {
    this._masterConnection.setLanguage(language)
    if (this._clusterConnection) {
      this._clusterConnection.setLanguage(language)
    }
  }

  /**
   * Return the current refresh token.
   *
   * It can be used to reactivate the connection without using the username and
   * password.
   *
   * @return {String}
   */
  getWakeUpToken(): string {
    const tokenObject: ITokenObject = {
      master: this._masterConnection.getWakeUpToken(),
      company: this._currentCompany,
      user: this.getUser(),
      cluster: this._clusterConnection
        ? this._clusterConnection.getWakeUpToken()
        : null
    }

    return JSON.stringify(tokenObject)
  }

  /**
   * Initialize the connection object and connect to the server
   *
   * @param {Object} args see connect function
   *
   * @private
   */

  private async _initConnection(args: IInitConnectionArgs): Promise<any> {
    this._axios = args.axios
    let result = null;

    if ('noLogin' in args) {
      this._masterConnection = new Connection(this._getMasterServer(), args.axios, this._provider, this._headerMeta)
      this._repositoryCollection.setMasterConnection(this._masterConnection)
    } else if ('sessionToken' in args) {
      await this._initConnectionViaSessionToken(args as IClientConnectArgs)
    } else if ('wakeUpToken' in args) {
      await this._initConnectionViaWakeUpToken(args)
    } else if ('accessToken' in args && args.accessToken) {
      await this._initConnectionViaMasterTokens(args)
    } else if ('refreshToken' in args) {
      await this._initConnectionViaRefreshToken(args)
    }  else if ('deprecatedSessionToken' in args && 'confirmationCode' in args) {
      result = await this._initConnectionViaDeprecatedSessionTokenAndConfirmCode(args as IInitConnectionViaDeprecatedJwtAndConfirmCode)
    } else {
      await this._initConnectionViaCredentials(args)
    }

    this._registerConnectionListeners()

    return result
  }

  /**
   * Initialize the connection using a wake up token.
   *
   * @param {Object} args
   *
   * @returns {Promise<void>}
   *
   * @private
   */
  private async _initConnectionViaWakeUpToken(args: IInitConnectionViaWakeUpTokenArgs) {
    if (!('wakeUpToken' in args)) throw new Error('WakeUp Token is missing')
    const wakeUpToken = JSON.parse(args.wakeUpToken)
    this._masterUser = wakeUpToken.user
    this._currentCompany = wakeUpToken.company

    this._masterConnection = new Connection(this._getMasterServer(), args.axios, this._provider, this._headerMeta)

    const masterConnectionArgs = args
    const masterWakeUpToken = wakeUpToken.master
    masterWakeUpToken.user.id = this._masterUser.masterId
    masterConnectionArgs.wakeUpToken = JSON.stringify(masterWakeUpToken)
    this._masterConnection.setRefreshRoute(this._routes.masterRefresh)
    await this._masterConnection.connect(masterConnectionArgs)
    this._repositoryCollection.setMasterConnection(this._masterConnection)

    const user = this._masterConnection.getUser()
    this._masterUser.preferredLanguage = user.preferredLanguage
    this._masterUser.threeSixtyId = user.threeSixtyId


    if (wakeUpToken.company) {
      this._clusterConnection = new Connection(wakeUpToken.company.cluster.apiEndpoint, args.axios, this._provider, this._headerMeta)
      this._clusterConnection.setRefreshRoute(this._routes.clusterRefresh)
      const clusterConnectionArgs = args
      clusterConnectionArgs.wakeUpToken = JSON.stringify(wakeUpToken.cluster)
      await this._clusterConnection.connect(clusterConnectionArgs)
      this._repositoryCollection.setClusterConnection(this._clusterConnection)
    }
  }

  private async _initConnectionViaCredentials(args: IClientConnectArgs) {
    const apiServer = this._getMasterServer()

    LeankoalaClient._assertAxios(args)
    this._axios = args.axios

    this._masterConnection = new Connection(apiServer, this._axios, this._provider, this._headerMeta)

    const route = {version: 1, path: '{application}/auth/login', method: 'POST'}

    const withMemories = Boolean(args.withMemories || false)

    const result = await this._masterConnection.send(
      route,
      {
        emailOrUserName: args.username,
        password: args.password,
        application: this._provider,
        withMemories
      },
      true
    )

    this._handleLoginData(result)

    if (args.autoSelectCompany) {
      await this._autoSelectCompany()
    }
  }

  /**
   * Assert that the args parameter contain a valid axios HTTP client.
   *
   * @param args
   * @private
   */
  private static _assertAxios(args: IClientConnectArgs) {
    if (!('axios' in args)) {
      throw new Error('Missing parameter axios. The HTTP client must be injected.')
    }

    if (typeof args.axios !== 'function') {
      throw new Error(
        'The axios argument is not a function. Seems like it is not a valid axios object,'
      )
    }
  }

  private async _initConnectionViaSessionToken(args: IClientConnectArgs) {
    const apiServer = this._getMasterServer()

    LeankoalaClient._assertAxios(args)
    this._axios = args.axios

    this._masterConnection = new Connection(apiServer, this._axios, this._provider, this._headerMeta)
    // TODO: Check if we can make the path whitelabeld
    const route = {version: 1, path: '360/auth/session', method: 'POST'}

    const withMemories = Boolean(args.withMemories || false)

    const result = await this._masterConnection.send(
      route,
      {
        sessionToken: args.sessionToken,
        withMemories
      },
      true
    )

    this._handleLoginData(result)

    if (args.autoSelectCompany) {
      await this._autoSelectCompany()
    }
  }

  private async _initConnectionViaDeprecatedSessionTokenAndConfirmCode(args: IInitConnectionViaDeprecatedJwtAndConfirmCode) {
    const apiServer = this._getMasterServer()

    LeankoalaClient._assertAxios(args)
    this._axios = args.axios

    this._masterConnection = new Connection(apiServer, this._axios, this._provider, this._headerMeta)

    const route = {version: 1, path: '{application}/auth/session-deprecated/confirm', method: 'POST'}

    const withMemories = Boolean(args.withMemories || false)

    const result = await this._masterConnection.send(
      route,
      {
        deprecatedSessionToken: args.deprecatedSessionToken,
        confirmationCode: args.confirmationCode,
        application: this._provider,
        withMemories
      },
      true
    )

    this._handleLoginData(result)

    if (args.autoSelectCompany) {
      await this._autoSelectCompany()
    }

    return result
  }

  /**
   * The login function always returns the same data. This method handles it and initializes the
   * client.
   *
   * @param loginData
   * @private
   */
  private _handleLoginData(loginData) {
    this._masterToken = loginData.token
    this._refreshToken = loginData.refreshToken
    this._masterUser = loginData.user
    this._masterConnection.setUser(loginData.user)
    this._masterUser.masterId = loginData.user.id
    if (loginData.memories) {
      this._masterUser.memories = loginData.memories
    }
    this._companies = loginData.companies

    this._masterConnection.setAccessToken(this._masterToken, this._refreshToken)
    this._repositoryCollection.setMasterConnection(this._masterConnection)
  }

  private async _initConnectionViaRefreshToken(args: IClientConnectArgs) {
    this._masterConnection = new Connection(this._getMasterServer(), args.axios, this._provider, this._headerMeta)
    this._masterConnection.setRefreshRoute(this._routes.masterRefresh)
    await this._masterConnection.connect(args)

    this._masterUser = this._masterConnection.getUser()
    this._masterUser.masterId = this._masterUser.id
    this._masterToken = this._masterConnection.getAccessToken()
    this._companies = this._masterUser.companies
    this._repositoryCollection.setMasterConnection(this._masterConnection)

    if (args.autoSelectCompany) {
      await this._autoSelectCompany()
    }
  }

  private async _initConnectionViaMasterTokens(args: IInitConnectionViaMasterTokens) {
    this._masterConnection = new Connection(this._getMasterServer(), args.axios, this._provider, this._headerMeta)
    this._masterConnection.setAccessToken(args.accessToken, args.refreshToken)
    this._masterToken = args.accessToken

    if ('user' in args) {
      this._masterConnection.setUser(args.user)
      this._user = args.user
      this._user.masterId = args.user.id
      this._masterUser = args.user
      this._companies = args.user.companies
    }

    this._repositoryCollection.setMasterConnection(this._masterConnection)

    if (args.autoSelectCompany) {
      await this._autoSelectCompany()
    }
  }

  private async _autoSelectCompany() {
    if (this._companies.length === 0) {
      throw new Error('Unable to auto select the company. User is not connected to any.')
    }
    const company = this._companies[0]

    await this.switchCompany(company.id)
  }

  /**
   * Returns the master server.
   *
   * @returns {string}
   */
  async switchCompany(companyId: string) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const client = this
    let currentCompany
    this._companies.forEach(function (company) {
      if (company.id === companyId) {
        currentCompany = company
      }
    })

    if (currentCompany) {
      await client._switchCluster(currentCompany.cluster)
      this._currentCompany = currentCompany
    } else {
      throw new Error('Unable to select the company. Company id not connected to user.')
    }
  }

  /**
   * Returns the master server.
   * @param cluster
   * @private
   */
  private async _switchCluster(cluster: ISwitchClusterArgs) {
    this._clusterConnection = new Connection(cluster.apiEndpoint, this._axios, this._provider, this._headerMeta)
    this._repositoryCollection.setClusterConnection(this._clusterConnection)
    this._clusterConnection.addDefaultParameter('masterUserId', this._masterUser.id)

    await this._clusterConnection.connect({loginToken: this._masterToken})

    const clusterUser = this._clusterConnection.getUser()
    this._masterUser.clusterId = clusterUser.id
    this._masterUser.id = clusterUser.id
  }

  /**
   * Returns the master server.
   * @returns {string}
   */
  private _getMasterServer() {
    switch (this._environment) {
      case EEnvironment.Local:
        return EServer.Local
      case EEnvironment.Stage:
        return EServer.Stage
      case EEnvironment.Production:
        return EServer.Production
      default:
        throw new Error('The given environment "' + this._environment + '" is unknown.')
    }
  }

  /**
   * Register all known connections listeners.
   *
   * @private
   */
  private _registerConnectionListeners() {
    const masterConnection = this._masterConnection
    const clusterConnection = this._clusterConnection
    const listeners = this._registeredEventListeners

    Object.keys(listeners).forEach((key) => {
      listeners[key].forEach((element) => {
        masterConnection.on(key, element)
        if (clusterConnection) {
          clusterConnection.on(key, element)
        }
      })
    })
  }

  /**
   * Return the repository by the given name.
   *
   * Throws an exception if the repository is not known.
   *
   * @param {String} entityType
   *
   * @return {Repository}
   *
   * @throws {Error}
   */
  async getRepository(entityType: TRepositories): Promise<any> {
    if (this._connectionStatus === 'disconnected') {
      throw new Error('Please connect the client before running this method.')
    }

    if (this._connectionStatus === 'connected') {
      return this._repositoryCollection.getRepository(entityType)
    }

    if (this._connectionStatus === 'connecting') {
      while (this._connectionStatus === 'connecting') {
        await this._sleep(300)
      }
      return this.getRepository(entityType)
    }
  }

  /**
   * Returns
   */
  async getRepositoryCollection(): Promise<RepositoryCollection> {
    if (this._connectionStatus === 'disconnected') {
      throw new Error('Please connect the client before running this method.')
    }

    if (this._connectionStatus === 'connected') {
      return this._repositoryCollection
    }

    if (this._connectionStatus === 'connecting') {
      while (this._connectionStatus === 'connecting') {
        await this._sleep(300)
      }
      return this.getRepositoryCollection()
    }

    return this._repositoryCollection
  }

  /**
   * Sleep for an amount of milliseconds.
   *
   * @param {Number} milliseconds
   * @return {Promise}
   *
   * @private
   */
  private async _sleep(milliseconds: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  /**
   * Return the current cluster user.
   *
   * @return {Object}
   */
  getUser() {
    if (!this._masterUser) {
      throw new Error('No user found. Please run connect() to login in.')
    }
    return this._masterUser
  }

  /**
   * Return the current company.
   */
  getCompany() {
    return this._currentCompany
  }

  /**
   * Register event handler.
   *
   * @param {String} eventName
   * @param {CallableFunction} callback
   */
  on(eventName: string, callback: CallableFunction) {
    if (!(eventName in this._registeredEventListeners)) {
      this._registeredEventListeners[eventName] = []
    }

    this._registeredEventListeners[eventName].push(callback)

    if (this._masterConnection) {
      this._masterConnection.on(eventName, callback)
    }

    if (this._clusterConnection) {
      this._clusterConnection.on(eventName, callback)
    }
  }

  /**
   * Return all resolved promises.
   *
   * @param promises
   * @returns Object
   */
  async fetchAll(promises): Promise<any> {
    const promiseArray: string[] = []
    const results = {}
    let count = 0

    Object.keys(promises).forEach((element) => promiseArray.push(promises[element]))

    const promiseResults = await Promise.allSettled(promiseArray)

    Object.keys(promises).forEach((element) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      results[element] = promiseResults[count].value
      count++
    })

    return results
  }

  /**
   * Return true if the wake up token is expired.
   *
   * A wake up token is expired if the refresh token is expired.
   *
   * @param {string} token
   * @returns {boolean}
   */
  isWakeUpTokenExpired(token) {
    const {master, cluster} = JSON.parse(token)

    const time = Math.floor(new Date().getTime() / 1000)

    /** @todo this should be done in the connection  **/
    if (!cluster || cluster.expireDate < time) {
      return true
    }

    return !master || master.expireDate < time
  }

  /**
   * Trigger Token Refresh
   * @param { string } token
   */
  setRefreshToken(token: string) {
    this._refreshToken = token
  }

  async setMemory(application, key, value) {
    const memoryRepo = await this.getRepository('memory')
    await memoryRepo.set('360monitoring', 'user', this.getUser().masterId, {key, value})
    this._masterUser.memories[key] = value
  }

}

export {
  LeankoalaClient,
  BadRequestError,
  MarketPlaceConsts,
  RefreshTokenInvalidError,
  SessionConnector
}

