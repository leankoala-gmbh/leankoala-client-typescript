import Repository from '../Repository';
export interface ICreateComponentArguments {
    system: number;
    enableToolsBySystem?: boolean;
}
export interface ICreateComponentsArguments {
    system: number;
    enableToolsBySystem?: boolean;
    updateIfComponentSuggestionExists?: boolean;
    components: any[];
}
declare class ComponentRepository extends Repository {
    constructor();
    showComponentTypes(project: any): Promise<any>;
    showComponents(component: any): Promise<any>;
    createComponent(args: ICreateComponentArguments): Promise<any>;
    createComponents(args: ICreateComponentsArguments): Promise<any>;
    updateComponent(component: any, args: any): Promise<any>;
    deleteComponent(component: any): Promise<any>;
}
export default ComponentRepository;
