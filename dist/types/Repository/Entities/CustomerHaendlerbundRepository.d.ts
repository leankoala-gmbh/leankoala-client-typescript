import Repository from '../Repository';
export interface ICreateShopArguments {
    name: string;
    base_url: string;
    owner: number;
    size?: 'large' | 'small';
}
export interface IUpdateShopArguments {
    name?: string;
    base_url?: string;
}
declare class CustomerHaendlerbundRepository extends Repository {
    constructor();
    createShop(args: ICreateShopArguments): Promise<any>;
    updateShop(system: any, args: IUpdateShopArguments): Promise<any>;
}
export default CustomerHaendlerbundRepository;
