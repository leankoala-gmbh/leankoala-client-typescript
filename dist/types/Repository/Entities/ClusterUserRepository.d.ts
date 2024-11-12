import Repository from '../Repository';
export interface IActivateArguments {
    activation_key: string;
}
export interface ICreateArguments {
    username?: string;
    master_id?: number;
    suppress_activation?: boolean;
    activate?: boolean;
    email: string;
    preferred_language?: string;
    company_id?: number;
    create_company?: boolean;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    password: string;
    _attributes?: any[];
}
export interface IUpdateUserArguments {
    email?: string;
    preferred_language?: string;
    company_id?: number;
    first_name?: string;
    last_name?: string;
}
export interface ISetPreferredLanguageArguments {
    language: string;
}
export interface IDeleteByEmailArguments {
    email: string;
}
export interface IConnectOAuthAccountArguments {
    provider: 'haendlerbund' | 'google';
    provider_user_id: string;
}
export interface IExistsArguments {
    query: any[];
}
export interface IFindArguments {
    query: any[];
}
export interface IUpdateMasterIdArguments {
    master_id: number;
}
export interface IChangePasswordArguments {
    password_new: string;
}
export interface IRequestPasswordResetArguments {
    email: string;
}
export interface IResetPasswordArguments {
    password: string;
}
declare class ClusterUserRepository extends Repository {
    constructor();
    activate(args: IActivateArguments): Promise<any>;
    create(provider: any, args: ICreateArguments): Promise<any>;
    updateUser(user: any, args: IUpdateUserArguments): Promise<any>;
    setPreferredLanguage(user: any, args: ISetPreferredLanguageArguments): Promise<any>;
    delete(user: any): Promise<any>;
    isDeletable(user: any): Promise<any>;
    deleteByEmail(args: IDeleteByEmailArguments): Promise<any>;
    connectOAuthAccount(user: any, args: IConnectOAuthAccountArguments): Promise<any>;
    exists(args: IExistsArguments): Promise<any>;
    find(args: IFindArguments): Promise<any>;
    findAll(providerIdentifier: any): Promise<any>;
    updateMasterId(user: any, args: IUpdateMasterIdArguments): Promise<any>;
    changePassword(user: any, args: IChangePasswordArguments): Promise<any>;
    requestPasswordReset(args: IRequestPasswordResetArguments): Promise<any>;
    resetPassword(user: any, args: IResetPasswordArguments): Promise<any>;
}
export default ClusterUserRepository;
