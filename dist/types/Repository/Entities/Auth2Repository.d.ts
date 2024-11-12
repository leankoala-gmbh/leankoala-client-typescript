import Repository from '../Repository';
export interface ILoginWithCredentialsArguments {
    emailOrUserName: string;
    password: string;
    withMemories?: boolean;
}
export interface ICreateTokenBySessionArguments {
    sessionToken?: string;
    withMemories?: boolean;
}
export interface ICreateTokenByRefreshTokenArguments {
    with_memories?: boolean;
}
export interface ICreateTokenArguments {
    with_memories?: boolean;
}
export interface ICreateTokenByConfirmCodeAndDeprecatedJwtArguments {
    deprecatedSessionToken: string;
    confirmationCode: string;
    withMemories?: boolean;
}
declare class Auth2Repository extends Repository {
    constructor();
    loginWithCredentials(application: any, args: ILoginWithCredentialsArguments): Promise<any>;
    createTokenBySession(application: any, args: ICreateTokenBySessionArguments): Promise<any>;
    createTokenByRefreshToken(application: any, user: any, args: ICreateTokenByRefreshTokenArguments): Promise<any>;
    createToken(application: any, user: any, args: ICreateTokenArguments): Promise<any>;
    createReadOnlyRefreshToken(application: any, user: any): Promise<any>;
    createTokenByConfirmCodeAndDeprecatedJwt(application: any, args: ICreateTokenByConfirmCodeAndDeprecatedJwtArguments): Promise<any>;
}
export default Auth2Repository;
