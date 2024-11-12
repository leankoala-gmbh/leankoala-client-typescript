import Repository from '../Repository';
export interface ICreateArguments {
    name: string;
    interval?: 'immediately' | '7d' | '24h' | '1h';
    severities?: any[];
    channels?: number;
}
export interface IUpdateArguments {
    name?: string;
    interval?: 'immediately' | '7d' | '24h' | '1h';
    severities?: any[];
    channels?: number;
}
declare class AlertingPolicyRepository extends Repository {
    constructor();
    list(project: any): Promise<any>;
    create(project: any, args: ICreateArguments): Promise<any>;
    delete(project: any, policy: any): Promise<any>;
    update(project: any, policy: any, args: IUpdateArguments): Promise<any>;
}
export default AlertingPolicyRepository;
