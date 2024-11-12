import Repository from '../Repository';
export interface ISearchArguments {
    user: number;
    with_next_full_run?: boolean;
    with_onboarding_status?: boolean;
    with_features?: boolean;
    owned_by_user?: boolean;
    filter_empty_projects?: boolean;
}
export interface IDeleteArguments {
    cancel_subscription?: boolean;
}
export interface IUpdateArguments {
    name: string;
    location?: string;
}
declare class ProjectRepository extends Repository {
    constructor();
    getStatus(project: any): Promise<any>;
    search(args: ISearchArguments): Promise<any>;
    searchAll(providerIdentifier: any): Promise<any>;
    delete(project: any, args: IDeleteArguments): Promise<any>;
    update(project: any, args: IUpdateArguments): Promise<any>;
    getUsers(project: any): Promise<any>;
    removeUser(project: any, user: any): Promise<any>;
}
export default ProjectRepository;
