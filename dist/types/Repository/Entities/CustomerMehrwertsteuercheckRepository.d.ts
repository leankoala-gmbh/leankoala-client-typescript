import Repository from '../Repository';
export interface IRunMwstCrawlArguments {
    email_address: string;
    start_url: string;
}
declare class CustomerMehrwertsteuercheckRepository extends Repository {
    constructor();
    runMwstCrawl(args: IRunMwstCrawlArguments): Promise<any>;
    showCrawlResult(crawlIdentifier: any): Promise<any>;
}
export default CustomerMehrwertsteuercheckRepository;
