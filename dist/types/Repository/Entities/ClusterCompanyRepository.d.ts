import Repository from '../Repository';
export interface ICreateArguments {
    name: string;
    master_id: number;
}
export interface IExistsArguments {
    company_name: string;
}
export interface ISearchArguments {
    company_name: string;
}
export interface IConnectUserArguments {
    user_role?: number;
}
export interface IUpdateMasterIdArguments {
    master_id: number;
}
declare class ClusterCompanyRepository extends Repository {
    constructor();
    create(providerIdentifier: any, args: ICreateArguments): Promise<any>;
    exists(args: IExistsArguments): Promise<any>;
    search(providerIdentifier: any, args: ISearchArguments): Promise<any>;
    findAll(providerIdentifier: any): Promise<any>;
    connectUser(company: any, user: any, args: IConnectUserArguments): Promise<any>;
    updateMasterId(company: any, args: IUpdateMasterIdArguments): Promise<any>;
}
export default ClusterCompanyRepository;
