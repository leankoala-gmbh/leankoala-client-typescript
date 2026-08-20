import {LeankoalaClient} from '../../src/360ApiClient'
import {requireTestCredentials} from '../helpers/credentials'
import 'dotenv/config'

export async function createClient() {
  const {username, password} = requireTestCredentials()
  const client = new LeankoalaClient('stage')
  await client.connect({username, password, autoSelectCompany: true})

  return client
}

describe('Check connection', () =>{
  test('Check if the client can connect', async () => {
    const client = await createClient()

    const user = client.getUser()
    expect(client.isConnected()).toBeTruthy()
    expect(client.getWakeUpToken().length).toBeGreaterThan(50)
    expect(user.id).toEqual(238)
  })
})
