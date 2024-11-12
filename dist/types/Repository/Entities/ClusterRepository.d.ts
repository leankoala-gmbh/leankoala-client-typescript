import Repository from '../Repository';
export interface IGetClusterArguments {
    identifier: string;
}
declare class ClusterRepository extends Repository {
    constructor();
    getCluster(application: any, args: IGetClusterArguments): Promise<any>;
}
export default ClusterRepository;
