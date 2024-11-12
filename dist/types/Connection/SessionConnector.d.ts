import { LeankoalaClient } from '../360ApiClient';
import { IClientConnectArgs } from '../typescript/interfaces/360ApiClient.interface';
interface ISessionTokenReturn {
    sessionToken: string;
    timezone: string;
    nickname: string;
    firstName: string;
    familyName: string;
    isLicensePartner: boolean;
    isTrial: boolean;
    responseObj: any;
}
declare class SessionConnector {
    private readonly environment;
    private axios;
    constructor(environment: any, axios: any);
    getSessionToken(): Promise<ISessionTokenReturn>;
    setTimezone(timezone: string): Promise<void>;
    static connect(client: LeankoalaClient, args: IClientConnectArgs): Promise<LeankoalaClient>;
    private getSessionEndpoint;
}
export default SessionConnector;
