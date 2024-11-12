import Repository from '../Repository';
export interface IInviteArguments {
    email: string;
    user_name?: string;
    user_role?: number;
}
declare class InvitationRepository extends Repository {
    constructor();
    invite(project: any, args: IInviteArguments): Promise<any>;
    abort(invitation: any): Promise<any>;
    getOpenInvitations(project: any): Promise<any>;
}
export default InvitationRepository;
