import Repository from '../Repository';
export interface IAddByChecklistArguments {
    checklist: any;
    clear_before?: boolean;
    activate_checks?: boolean;
}
export interface IAddByRecipeArguments {
    component: number;
    cookbook: number;
}
export interface IShowCollectionsArguments {
    group?: string;
}
export interface IShowActiveCollectionsArguments {
    group?: string;
}
export interface IUpdateCollectionsArguments {
    collections?: any[];
    group?: string;
}
declare class CheckRepository extends Repository {
    constructor();
    addByChecklist(system: any, args: IAddByChecklistArguments): Promise<any>;
    addByRecipe(args: IAddByRecipeArguments): Promise<any>;
    runChecksForSystem(system: any, toolIdentifier: any): Promise<any>;
    showCollections(project: any, toolIdentifier: any, args: IShowCollectionsArguments): Promise<any>;
    showActiveCollections(system: any, toolIdentifier: any, args: IShowActiveCollectionsArguments): Promise<any>;
    updateCollections(system: any, args: IUpdateCollectionsArguments): Promise<any>;
}
export default CheckRepository;
