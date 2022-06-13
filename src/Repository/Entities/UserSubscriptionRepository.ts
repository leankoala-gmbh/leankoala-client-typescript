import Repository from '../Repository'


export interface IUpdateArguments {
  system_count: number
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-06-13
 */
class UserSubscriptionRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Update the subscription for a given user.
   *
   * request url: /kapi/v1/user/subscriptions/{user}
   * request method: PUT
   *
   * @param user
   * @param {Object} args
   * @param {Number} args.system_count The number of systems the user is allowed to create.
   */
  async update(user, args: IUpdateArguments): Promise<any> {
    const route = { path: 'user/subscriptions/{user}', method: 'PUT', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['system_count']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default UserSubscriptionRepository
