import Repository from '../Repository';
declare class CheckCertificateRepository extends Repository {
    constructor();
    getExpirationResults(system: any): Promise<any>;
}
export default CheckCertificateRepository;
