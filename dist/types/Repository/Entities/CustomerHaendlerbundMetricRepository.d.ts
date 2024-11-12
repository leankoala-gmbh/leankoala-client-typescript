import Repository from '../Repository';
export interface IFindBySystemArguments {
    tool?: any;
    tools?: any[];
    metric_type?: 'value' | 'status';
    filter_trailing_nulls?: boolean;
    min_value?: number;
}
declare class CustomerHaendlerbundMetricRepository extends Repository {
    constructor();
    findBySystem(system: any, args: IFindBySystemArguments): Promise<any>;
}
export default CustomerHaendlerbundMetricRepository;
