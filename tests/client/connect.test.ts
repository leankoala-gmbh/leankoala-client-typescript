import {LeankoalaClient} from '../../src/360ApiClient'
import 'dotenv/config'


describe('Check connection', () =>{
  test('Check if the client can connect', async () => {
    const username = process.env['TEST_USERNAME'] || 'features@leankoala.com'
    const password = process.env['TEST_PASSWORD'] || 'langner'

    const client = new LeankoalaClient('stage')
    await client.connect({ username, password })

    const user = client.getUser()
    expect(client.isConnected()).toBeTruthy()
    expect(client.getWakeUpToken().length).toBeGreaterThan(50)
    expect(user.id).toEqual(140)
  })
})

