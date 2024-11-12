import Repository from '../Repository';
export interface ICreateSystemArguments {
    project?: number;
    add_standard_alerting?: boolean;
    name: string;
    base_url: string;
    owner: number;
    system_type: number;
    system_size: number;
    add_checklist_checks?: boolean;
    add_support_user?: boolean;
    location?: string;
}
export interface IUpdateSystemArguments {
    name?: string;
    base_url?: string;
}
declare class SystemRepository extends Repository {
    constructor();
    createSystem(args: ICreateSystemArguments): Promise<any>;
    updateSystem(system: any, args: IUpdateSystemArguments): Promise<any>;
    getComponents(system: any): Promise<any>;
    getComponentSuggestions(system: any): Promise<any>;
    changeLastFullRun(system: any, status: any): Promise<any>;
    getNextLastFullRun(system: any): Promise<any>;
    getSystemTypes(providerIdentifier: any, system_size: any): Promise<any>;
    getComponentLimit(system: any): Promise<any>;
    triggerComponentFinder(project: any, system: any, user: any): Promise<any>;
}
export default SystemRepository;
