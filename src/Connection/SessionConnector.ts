import {EEnvironment, EServer, ESession} from "../Repository/Constants/Enviroment";
import axios from 'axios'
import {LeankoalaClient} from "../360ApiClient";

/**
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2022-08-16
 */
class SessionConnector {
  private readonly environment: string;
  private axios: any;

  constructor(environment, axios) {
    this.environment = environment
    this.axios = axios
  }

  private async getSessionToken(): Promise<string> {
    const sessionToken = await this.axios.post(this.getSessionEndpoint(), {withCredentials: true})
    return sessionToken
  }

  public static async connect(client, args) {
    if (!('axios' in args)) {
      args['axios'] = axios
    }

    if (typeof args.axios !== 'function') {
      throw new Error(
        'The axios argument is not a function. Seems like it is not a valid axios object,'
      )
    }

    const sessionConnector = new SessionConnector(client.getEnvironment, args.axios)
    args['sessionToken'] = await sessionConnector.getSessionToken()
    client.connect(args)

    return client
  }

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
