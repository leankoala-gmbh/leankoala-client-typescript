import Repository from '../Repository';
declare class CheckHealthCheckRepository extends Repository {
    constructor();
    getResults(system: any): Promise<any>;
}
export default CheckHealthCheckRepository;
