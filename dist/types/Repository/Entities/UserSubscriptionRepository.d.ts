import Repository from '../Repository';
export interface IUpdateArguments {
    system_count: number;
}
declare class UserSubscriptionRepository extends Repository {
    constructor();
    update(user: any, args: IUpdateArguments): Promise<any>;
}
export default UserSubscriptionRepository;
