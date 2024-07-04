import axios from 'axios'
import {EEnvironment, EServer, ESession} from '../Repository/Constants/Enviroment'
import {LeankoalaClient} from '../360ApiClient'
import {IClientConnectArgs} from '../typescript/interfaces/360ApiClient.interface'

interface ISessionTokenReturn {
  sessionToken: string
   timezone: string
   nickname: string
  firstName: string
   familyName: string
   isLicensePartner: boolean
  isTrial: boolean
  responseObj: any
}

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
    this.environment = environment
    this.axios = axios
  }

  /**
   * Retrieve the session token from the API. This can only be done inside a browser.
   */
  public async getSessionToken(): Promise<ISessionTokenReturn> {
    const sessionTokenResponse = await this.axios.get(this.getSessionEndpoint(), {withCredentials: true})
    const responseObj = JSON.parse(JSON.stringify(sessionTokenResponse.data))
    const sessionToken = responseObj.access

    if (!sessionToken?.startsWith('ey')) {
      if (!sessionToken) throw new Error('No session token found')
      throw new Error(`The returned token is no a valid. Given "${sessionToken.substr(0, 20)}...".`)
    }

    return {
      sessionToken,
      timezone: responseObj.timezone,
      nickname: responseObj.nickname,
      firstName: responseObj.firstName,
      familyName: responseObj.familyName,
      isLicensePartner: responseObj.isLicensePartner,
      isTrial: responseObj.isTrial,
      responseObj
    }
  }

   public async setTimezone(timezone: string) {
     try {
       await this.axios.put(this.getSessionEndpoint('/profile'), {
         timezone
       }, {withCredentials: true})

     } catch (err) {
       console.error(err)
     }
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
    const {sessionToken} = await sessionConnector.getSessionToken()
    args.sessionToken = sessionToken
    await client.connect(args)

    return client
  }

  /**
   * Return the correct API endpoint for the given environment.
   *
   * @throws Error
   */
  private getSessionEndpoint(path = '/token'): string {
    const domain = window.location.hostname
    const domainRegex = /(koality(\.stage)?\.360monitoring|stage\.site-quality-monitoring|site-quality-monitoring)\.com/

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
    } else if (domainRegex.test(domain)) {
      return `https://${['auth', ...domain.split(domain.includes('koality') ? '.' : '://').slice(domain.includes('koality') ? 1 : 0)].join('.')}${path}`
    } else {
      const monitoringDomain = domain.replace('sitecheck', 'monitoring')
      return `https://${monitoringDomain}${path}`
    }
  }
}

export default SessionConnector
