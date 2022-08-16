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
  private constructor(environment, axios) {
    this.environment = environment
    this.axios = axios
  }

  /**
   * Retrieve the session token from the API. This can only be done inside a browser.
   */
  private async getSessionToken(): Promise<string> {
    const sessionToken = await this.axios.post(this.getSessionEndpoint(), {}, {withCredentials: true})
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
    switch (this.environment) {
      case EEnvironment.Local:
        return EServer.Local
      case EEnvironment.Stage:
        return ESession.Stage
      case EEnvironment.Production:
        return ESession.Production
      default:
        throw new Error('The given environment "' + this.environment + '" is unknown.')
    }
  }
}

export default SessionConnector
