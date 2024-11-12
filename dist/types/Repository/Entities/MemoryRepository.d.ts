import Repository from '../Repository';
export interface ISetArguments {
    key: string;
    value: string;
}
declare class MemoryRepository extends Repository {
    constructor();
    set(application: any, objectType: any, objectId: any, args: ISetArguments): Promise<any>;
}
export default MemoryRepository;
