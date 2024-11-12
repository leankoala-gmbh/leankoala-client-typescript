import Repository from '../Repository';
export interface IIsTwoFactorRequiredArguments {
    action: string;
}
export interface ITriggerTwoFactorForActionArguments {
    action: string;
}
declare class TwoFactorRepository extends Repository {
    constructor();
    isTwoFactorRequired(args: IIsTwoFactorRequiredArguments): Promise<any>;
    triggerTwoFactorForAction(args: ITriggerTwoFactorForActionArguments): Promise<any>;
}
export default TwoFactorRepository;
