import Repository from '../Repository';
export interface ICreateTokenByCredentialsResult {
    user: {
        company: {
            subscription: {
                trial_end?: number;
            };
        };
        preferred_language?: string;
    };
}
export interface ICreateTokenByCredentialsArguments {
    username: string;
    password: string;
    expire?: boolean;
    with_memories?: boolean;
}
export interface ICreateTokenByRefreshTokenArguments {
    with_memories?: boolean;
}
declare class AuthRepository extends Repository {
    constructor();
    createTokenByCredentials(args: ICreateTokenByCredentialsArguments): Promise<ICreateTokenByCredentialsResult>;
    createTokenByRefreshToken(user: any, args: ICreateTokenByRefreshTokenArguments): Promise<any>;
}
export default AuthRepository;
