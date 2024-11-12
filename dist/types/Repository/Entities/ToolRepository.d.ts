import Repository from '../Repository';
export interface IGetChangedConfigurationArguments {
    newerThan: number;
    minifyOutput?: boolean;
}
export interface IOverwriteArguments {
    errors_in_a_row?: number;
    success_in_a_row?: number;
}
declare class ToolRepository extends Repository {
    constructor();
    getChangedConfiguration(args: IGetChangedConfigurationArguments): Promise<any>;
    findByProject(project: any): Promise<any>;
    getConfiguration(project: any, toolIdentifier: any): Promise<any>;
    overwrite(project: any, toolIdentifier: any, args: IOverwriteArguments): Promise<any>;
}
export default ToolRepository;
