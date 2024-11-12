import Repository from '../Repository';
declare class LocationRepository extends Repository {
    constructor();
    list(): Promise<any>;
}
export default LocationRepository;
