import {LeankoalaClient} from '../../src/360ApiClient'
import 'dotenv/config'


describe('Check connection', () => {
  test('Check if the client can connect', async () => {
    const username = process.env['TEST_USERNAME'] || 'features@leankoala.com'
    const password = process.env['TEST_PASSWORD'] || 'langner'

    let client = new LeankoalaClient('stage')
    await client.connect({username, password, withMemories: true, autoSelectCompany: true})

    let user = client.getUser()

    const JEST_MEMORY_KEY = 'jestKey'

    const memory_value = Math.random().toString()

    await client.setMemory('koality', JEST_MEMORY_KEY, memory_value)

    expect(user).toHaveProperty('memories')
    expect(user.memories).toHaveProperty(JEST_MEMORY_KEY)

    client = new LeankoalaClient('stage')
    await client.connect({username, password, withMemories: true, autoSelectCompany: true})

    user = client.getUser()

    expect(user).toHaveProperty('memories')
    expect(user.memories).toHaveProperty(JEST_MEMORY_KEY)
  })
})

