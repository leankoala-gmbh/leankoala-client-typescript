import Repository from '../Repository';
export interface IIgnorePatternArguments {
    patterns: any[];
}
declare class CheckFileSizeRepository extends Repository {
    constructor();
    getResults(system: any): Promise<any>;
    ignorePattern(system: any, args: IIgnorePatternArguments): Promise<any>;
}
export default CheckFileSizeRepository;
