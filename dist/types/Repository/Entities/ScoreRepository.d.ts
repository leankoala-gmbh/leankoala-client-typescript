import Repository from '../Repository';
export interface IGetScoresByUserArguments {
    scores: any[];
    with_sub_scores?: boolean;
    filter_empty_projects?: boolean;
}
export interface IGetScoresArguments {
    scores: any[];
}
declare class ScoreRepository extends Repository {
    constructor();
    getScoresByUser(user: any, args: IGetScoresByUserArguments): Promise<any>;
    getScore(system: any, scoreName: any): Promise<any>;
    getScores(system: any, args: IGetScoresArguments): Promise<any>;
}
export default ScoreRepository;
