import axios from 'axios'
import {EEnvironment, EServer, ESession} from '../Repository/Constants/Enviroment'
import {LeankoalaClient} from '../360ApiClient'
import {IClientConnectArgs} from '../typescript/interfaces/360ApiClient.interface'

/**
 * This connector uses the browser session to connect the leankoala client to the auth2 server.
 *
 * @example SessionConnector::connect(client, args)
 *
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2022-08-16
 */
class SessionConnector {
  private readonly environment: string
  private axios: any

  /**
   * The private constructor. To use the connector please use the static connect function.
   *
   * @param {string} environment
   * @param axios
   */
  constructor(environment, axios) {
    axios.defaults.withCredentials = true
    this.environment = environment
    this.axios = axios
  }

  /**
   * Retrieve the session token from the API. This can only be done inside a browser.
   */
  public async getSessionToken(): Promise<string> {
    const sessionTokenResponse = await this.axios.get(this.getSessionEndpoint(), {withCredentials: true})
    const sessionToken = sessionTokenResponse.data

    if (!sessionToken.startsWith('ey')) {
      throw new Error('The returned token is no a valid. Given "' + sessionToken.substr(0, 20) + '...".')
    }

    return sessionToken
  }

  /**
   * Connect the given client via the browser session.
   *
   * @param client
   * @param args
   *
   * @throws Error
   */
  public static async connect(client: LeankoalaClient, args: IClientConnectArgs): Promise<LeankoalaClient> {
    if (!('axios' in args)) {
      args.axios = axios
    }

    if (typeof args.axios !== 'function') {
      throw new Error(
        'The axios argument is not a function. Seems like it is not a valid axios object,'
      )
    }

    const sessionConnector = new SessionConnector(client.getEnvironment(), args.axios)
    args.sessionToken = await sessionConnector.getSessionToken()
    await client.connect(args)

    return client
  }

  /**
   * Return the correct API endpoint for the given environment.
   *
   * @throws Error
   */
  private getSessionEndpoint(): string {

    const domain = window.location.hostname

    if (domain.includes('koality.io')) {
      switch (this.environment) {
        case EEnvironment.Local:
          throw new Error('The get session should not be used on local development. Please check your white label config for localhost.')
        case EEnvironment.Stage:
          return ESession.Stage
        case EEnvironment.Production:
          return ESession.Production
        default:
          throw new Error('The given environment "' + this.environment + '" is unknown.')
      }
    } else {
      const monitoringDomain = domain.replace('sitecheck', 'monitoring')
      return monitoringDomain + '/token'
    }
  }
}

export default SessionConnector
