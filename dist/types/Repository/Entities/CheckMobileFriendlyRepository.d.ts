import Repository from '../Repository';
declare class CheckMobileFriendlyRepository extends Repository {
    constructor();
    getResults(system: any): Promise<any>;
}
export default CheckMobileFriendlyRepository;
