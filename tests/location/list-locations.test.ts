import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check list locations', () => {
  test('Check that locations are returned', async () => {
    const client = await createClient()
    const locationRepository = (await client.getRepositoryCollection()).getLocationRepository()

    const locations = await locationRepository.list()

    expect(locations.length).toBe(3)
  })
})

