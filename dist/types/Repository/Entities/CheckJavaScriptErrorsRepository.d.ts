import Repository from '../Repository';
declare class CheckJavaScriptErrorsRepository extends Repository {
    constructor();
    getResults(system: any): Promise<any>;
}
export default CheckJavaScriptErrorsRepository;
