import Repository from '../Repository';
export interface IIgnorePatternArguments {
    patterns: any[];
}
export interface IUnignorePatternArguments {
    pattern_id: number;
}
declare class CheckDeadLinksRepository extends Repository {
    constructor();
    getResults(system: any): Promise<any>;
    getBlockedPatterns(): Promise<any>;
    getResultsByCompany(company: any): Promise<any>;
    getConfiguration(system: any): Promise<any>;
    ignorePattern(system: any, args: IIgnorePatternArguments): Promise<any>;
    unignorePattern(system: any, args: IUnignorePatternArguments): Promise<any>;
}
export default CheckDeadLinksRepository;
