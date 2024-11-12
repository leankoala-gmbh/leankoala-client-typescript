import Repository from '../Repository';
declare class CheckCookieRepository extends Repository {
    constructor();
    getDomains(system: any): Promise<any>;
}
export default CheckCookieRepository;
