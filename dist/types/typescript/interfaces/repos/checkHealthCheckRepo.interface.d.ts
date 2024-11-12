import { TCheckSystem } from '../global/checkRepos.interface';
export interface IRCheckHealthCheck {
    getResults(system: TCheckSystem, args: object): Promise<any>;
}
