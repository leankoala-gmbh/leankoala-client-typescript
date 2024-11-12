import Repository from '../Repository';
declare class ApplicationRepository extends Repository {
    constructor();
    getConfigByCName(cName: any): Promise<any>;
    getPrimaryCluster(application: any): Promise<any>;
}
export default ApplicationRepository;
