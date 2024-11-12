import Repository from '../Repository';
declare class CheckSitemapRepository extends Repository {
    constructor();
    getResults(system: any): Promise<any>;
}
export default CheckSitemapRepository;
