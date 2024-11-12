import Repository from '../Repository';
export interface IDisconnectUserArguments {
    deleteIfNoCompany?: boolean;
}
export interface ISetClusterArguments {
    cluster: number;
}
declare class CompanyRepository extends Repository {
    constructor();
    disconnectUser(application: any, company: any, user: any, args: IDisconnectUserArguments): Promise<any>;
    setCluster(application: any, company: any, args: ISetClusterArguments): Promise<any>;
}
export default CompanyRepository;
