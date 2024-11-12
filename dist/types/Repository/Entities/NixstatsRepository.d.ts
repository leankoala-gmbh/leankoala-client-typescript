import Repository from '../Repository';
export interface ICreateWebsiteMonitorArguments {
    url: string;
}
declare class NixstatsRepository extends Repository {
    constructor();
    createWebsiteMonitor(company: any, args: ICreateWebsiteMonitorArguments): Promise<any>;
}
export default NixstatsRepository;
