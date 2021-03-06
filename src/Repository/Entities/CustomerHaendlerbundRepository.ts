import Repository from '../Repository'


export interface ICreateShopArguments {
  name: string
  base_url: string
  owner: number
  size?: 'large' | 'small'
}

export interface IUpdateShopArguments {
  name?: string
  base_url?: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class CustomerHaendlerbundRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Händlerbund only: the function is used to create a shop.
   *
   * request url: /kapi/v1/customers/haendlerbund/shops
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.name The shops name.
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain.
   * @param {Number} args.owner The shops owner (id).
   * @param {*} args.size The shop size. It determines if the checks are done on a daily or hourly
   *                          base. (default: large)
   */
  async createShop(args: ICreateShopArguments): Promise<any> {
    const route = { path: 'customers/haendlerbund/shops', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['name', 'base_url', 'owner']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Händlerbund only: the function is used to update a shop.
   *
   * request url: /kapi/v1/customers/haendlerbund/shops/{system}
   * request method: PUT
   *
   * @param system
   * @param {Object} args
   * @param {String} args.name The shops name. (optional)
   * @param {Url} args.base_url The shops base url with scheme, subdomain and domain. When changing the
   *                            base url all shop pages will change their base as well. (optional)
   */
  async updateShop(system, args: IUpdateShopArguments): Promise<any> {
    const route = { path: 'customers/haendlerbund/shops/{system}', method: 'PUT', version: 1 }
    const argList = Object.assign({ system }, args)

    return this.connection.send(route, argList)
  }

}

export default CustomerHaendlerbundRepository
