import Repository from '../Repository';
export interface ICreateUserArguments {
    email: string;
    password: string;
    company?: number;
    fullName?: any;
    firstName?: string;
    lastName?: string;
    suppressActivation?: boolean;
    handleDoubleRegistration?: boolean;
    activate?: boolean;
    threeSixtyId?: string;
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
export interface IChangePasswordArguments {
    password_old: string;
    password_new: string;
}
export interface IResetPasswordArguments {
    password: string;
}
export interface IRequestPasswordResetArguments {
    email: string;
}
export interface IActivateArguments {
    activation_key: string;
}
export interface IFindArguments {
    query: any[];
}
export interface IConnectAuthAccountArguments {
    provider: 'haendlerbund' | 'google' | '360';
    providerUserId: string;
}
declare class UserRepository extends Repository {
    constructor();
    createUser(application: any, args: ICreateUserArguments): Promise<any>;
    deleteUser(application: any, user: any): Promise<any>;
    updateUser(application: any, user: any, args: IUpdateUserArguments): Promise<any>;
    setPreferredLanguage(application: any, user: any, args: ISetPreferredLanguageArguments): Promise<any>;
    changePassword(application: any, user: any, args: IChangePasswordArguments): Promise<any>;
    isDeletable(application: any, user: any, company: any): Promise<any>;
    resetPassword(application: any, user: any, args: IResetPasswordArguments): Promise<any>;
    requestPasswordReset(application: any, args: IRequestPasswordResetArguments): Promise<any>;
    activate(application: any, args: IActivateArguments): Promise<any>;
    find(application: any, args: IFindArguments): Promise<any>;
    connectAuthAccount(application: any, user: any, args: IConnectAuthAccountArguments): Promise<any>;
}
export default UserRepository;
