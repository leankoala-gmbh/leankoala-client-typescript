import Repository from '../Repository';
export interface IGetResultsArguments {
    targetGroup?: any;
    use_cache?: boolean;
}
declare class CheckLighthouseRepository extends Repository {
    constructor();
    getResults(system: any, category: any, args: IGetResultsArguments): Promise<any>;
}
export default CheckLighthouseRepository;
