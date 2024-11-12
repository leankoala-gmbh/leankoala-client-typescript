import Repository from '../Repository';
export interface ISearchArguments {
    system?: number;
}
export interface ISinceArguments {
    days: number;
}
declare class IncidentRepository extends Repository {
    constructor();
    findByCompany(company: any): Promise<any>;
    search(project: any, args?: Partial<ISearchArguments>): Promise<any>;
    since(project: any, args: ISinceArguments): Promise<any>;
    find(project: any, incident: any): Promise<any>;
    getConfig(project: any): Promise<any>;
}
export default IncidentRepository;
