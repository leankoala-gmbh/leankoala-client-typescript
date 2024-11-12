import { TCheckSystem } from '../global/checkRepos.interface';
export interface IRCheckMobileFriendlyResultsResponse {
    google_url: string;
    result: {
        issues: string[];
        status: string;
    };
}
export interface IRCheckMobileFriendly {
    getResults(system: TCheckSystem, args: object): Promise<IRCheckMobileFriendlyResultsResponse>;
}
