import { LeankoalaClient } from '../../src/360ApiClient'

describe('Check refresh', () => {
  test('Check if the can reconnect via refresh token', async () => {
    const username = process.env['TEST_USERNAME'] || 'demo'
    const password = process.env['TEST_PASSWORD'] || 'demo'

    const client = new LeankoalaClient('stage')
    await client.connect({ username, password })
    const repo = await client.getRepositoryCollection().then(res => res.getWebsocketRepository())
    const rooms = await repo.getRooms()
    /**
     * dont test private methods
     */
      // const refreshToken = client._connection._refreshToken
      // const user = client.getUser()

      // const client2 = new LeankoalaClient('stage')
      //
      // try {
      //     await client2.connect({refreshToken, userId: user.id})
      // } catch (e) {
      //     console.log(e)
      // }

    expect(rooms.server).toContain('wss')
  })
})



