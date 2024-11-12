import Repository from '../Repository';
export interface ICreateArguments {
    name: string;
    type: 'email' | 'slack' | 'teams';
    options: any[];
    language?: string;
}
export interface IUpdateArguments {
    name?: string;
    type: 'email' | 'slack' | 'teams';
    options?: any[];
    language?: string;
}
declare class AlertingChannelRepository extends Repository {
    constructor();
    list(project: any): Promise<any>;
    create(project: any, args: ICreateArguments): Promise<any>;
    delete(project: any, channel: any): Promise<any>;
    update(project: any, channel: any, args: IUpdateArguments): Promise<any>;
}
export default AlertingChannelRepository;
