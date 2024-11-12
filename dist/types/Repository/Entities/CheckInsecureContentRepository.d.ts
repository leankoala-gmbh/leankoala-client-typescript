import Repository from '../Repository';
declare class CheckInsecureContentRepository extends Repository {
    constructor();
    getInsecureElements(system: any): Promise<any>;
}
export default CheckInsecureContentRepository;
