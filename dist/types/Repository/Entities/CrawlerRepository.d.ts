import Repository from '../Repository';
export interface ISetCheckStatusResult {
    url_check_status?: boolean;
}
export interface IRunCrawlArguments {
    user: number;
    checklist_name?: string;
    collections?: any[];
    name: string;
    system: number;
    depth?: number;
    path?: string;
    parallel_requests?: number;
}
export interface IRunCompanyCrawlArguments {
    user: number;
    checklist_name?: string;
    collections?: any[];
    name: string;
    depth?: number;
    path: string;
    parallel_requests?: number;
}
export interface IListCrawlsArguments {
    checklist_name?: string;
    system: number;
}
export interface IListCompanyCrawlsArguments {
    pagination_start?: number;
    pagination_size?: number;
    include_collections?: boolean;
    crawl_schedule?: number;
}
export interface ISetCheckStatusArguments {
    check_type: 'BrokenLink' | 'DeadLink' | 'JsErrorScanner' | 'JsErrorScanner_external' | 'SiteInfoBigFile' | 'SiteInfoFileSize';
    check_status: 'false_positive';
    url: string;
}
export interface ICreateCrawlScheduleArguments {
    path: string;
    depth?: number;
    parallel_requests?: number;
    interval: 'daily' | 'weekly' | 'monthly';
    timeslot: 'night' | 'morning' | 'noon' | 'afternoon';
    day_of_month_or_week?: number;
    collections: any[];
    timezone: string;
}
export interface IUpdateCrawlScheduleArguments {
    path?: string;
    depth?: number;
    parallel_requests?: number;
    interval?: 'daily' | 'weekly' | 'monthly';
    timeslot?: 'night' | 'morning' | 'noon' | 'afternoon';
    day_of_month_or_week?: number;
    collections?: any[];
    enabled?: boolean;
    timezone?: string;
}
declare class CrawlerRepository extends Repository {
    constructor();
    getCrawlerSettings(company: any): Promise<any>;
    runCrawl(project: any, args: IRunCrawlArguments): Promise<any>;
    runCompanyCrawl(company: any, args: IRunCompanyCrawlArguments): Promise<any>;
    listCrawls(project: any, args: IListCrawlsArguments): Promise<any>;
    listCompanyCrawls(company: any, args: IListCompanyCrawlsArguments): Promise<any>;
    abortCrawl(project: any, crawl: any): Promise<any>;
    getCrawl(crawl: any): Promise<any>;
    getCrawlCsv(crawl: any, downloadSecret: any): Promise<any>;
    getCrawlerStatus(project: any): Promise<any>;
    getCompanyCrawlerStatus(company: any): Promise<any>;
    getCrawlableCollections(): Promise<any>;
    setCheckStatus(company: any, args: ISetCheckStatusArguments): Promise<ISetCheckStatusResult>;
    deleteCheckStatus(company: any, crawlUrlStatus: any): Promise<any>;
    listCheckStatus(company: any): Promise<any>;
    listCrawlSchedules(company: any): Promise<any>;
    showCrawlSchedule(company: any, crawlSchedule: any): Promise<any>;
    createCrawlSchedule(company: any, args: ICreateCrawlScheduleArguments): Promise<any>;
    updateCrawlSchedule(company: any, crawlSchedule: any, args: IUpdateCrawlScheduleArguments): Promise<any>;
    deleteCrawlSchedule(company: any, crawlSchedule: any): Promise<any>;
    runScheduledCrawl(company: any, crawlSchedule: any): Promise<any>;
}
export default CrawlerRepository;
