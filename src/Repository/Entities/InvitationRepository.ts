const Repository = require('../Repository')


export interface IInviteArguments {
  email: string
  user_name?: string
  user_role?: number
}



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-11
 */
class InvitationRepository extends Repository {

  /**
   * This endpoint invites a new user to the project.
   *
   * request url: /kapi/v1/user/invitation/invite/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.email The invitations e-mail address
   * @param {String} args.user_name The users company name. (default: )
   * @param {Number} args.user_role The projects role of the newly added user. (default: 200)
   */
  async invite(project, args: IInviteArguments): Promise<any> {
    const route = { path: 'user/invitation/invite/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['email']
    this._assertValidArguments(requiredArguments, argList)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint aborts a given invitation.
   *
   * request url: /kapi/v1/user/invitation/abort/{invitation}
   * request method: DELETE
   *
   * @param invitation
   * @param {Object} args
   */
  async abort(invitation): Promise<any> {
    const route = { path: 'user/invitation/abort/{invitation}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ invitation }, args)

    return this._connection.send(route, argList)
  }

  /**
   * This endpoint returns a list of all open invitations for the given project.
   *
   * request url: /kapi/v1/user/invitation/open/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getOpenInvitations(project): Promise<any> {
    const route = { path: 'user/invitation/open/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, args)

    return this._connection.send(route, argList)
  }

}

module.exports = InvitationRepository
