import Repository from '../Repository';
declare class CheckBrokenResourceRepository extends Repository {
    constructor();
    getBrokenResources(system: any): Promise<any>;
}
export default CheckBrokenResourceRepository;
