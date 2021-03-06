import Repository from '../Repository'



/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class WebsocketRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Return a websocket server with the room names for the given user.
   * request url: /kapi/v1/websockets/rooms
   * request method: POST
   *
   * @param {Object} args
   */
  async getRooms(): Promise<any> {
    const route = { path: 'websockets/rooms', method: 'POST', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all websocket server with the room names.
   * request url: /kapi/v1/websockets/rooms/all
   * request method: POST
   *
   * @param {Object} args
   */
  async getAllRooms(): Promise<any> {
    const route = { path: 'websockets/rooms/all', method: 'POST', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

}

export default WebsocketRepository
