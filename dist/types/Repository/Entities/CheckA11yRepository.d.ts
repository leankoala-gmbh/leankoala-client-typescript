import Repository from '../Repository';
declare class CheckA11yRepository extends Repository {
    constructor();
    getResults(system: any): Promise<any>;
}
export default CheckA11yRepository;
