import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check get system types', () => {
  test('Check if system types are returned', async () => {
    const client = await createClient()
    const systemRepository = (await client.getRepositoryCollection()).getSystemRepository()

    const systemTypes = await systemRepository.getSystemTypes('koality', 1)

    expect(systemTypes).toStrictEqual({
      main_system_types: [{id: 15, name: 'Custom project', description: 'Lorem Ipsum'}],
      provider_id: 5
    })
  })
})

