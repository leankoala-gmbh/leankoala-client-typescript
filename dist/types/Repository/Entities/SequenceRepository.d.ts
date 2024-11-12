import Repository from '../Repository';
export interface ICreateSequenceArguments {
    name: string;
    startUrl: string;
    steps?: any[];
}
export interface IUpdateSequenceArguments {
    name?: string;
    startUrl?: string;
    steps?: any[];
}
declare class SequenceRepository extends Repository {
    constructor();
    getCommands(project: any): Promise<any>;
    getSequences(project: any): Promise<any>;
    createSequence(project: any, args: ICreateSequenceArguments): Promise<any>;
    updateSequence(project: any, args: IUpdateSequenceArguments): Promise<any>;
    activateSequence(sequence: any): Promise<any>;
    deactivateSequence(sequence: any): Promise<any>;
    getRecentRuns(sequence: any): Promise<any>;
}
export default SequenceRepository;
