import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check list locations', () => {
  test('Check that locations are returned', async () => {
    const client = await createClient()
    const locationRepository = (await client.getRepositoryCollection()).getLocationRepository()

    const locations = await locationRepository.list()

    expect(locations).toStrictEqual([
      { identifier: 'asia_jp', name: 'Asia (east)' },
      { identifier: 'us_east', name: 'US (east)' },
      { identifier: 'us', name: 'US' },
      { identifier: 'de', name: 'Europe (central)' }
    ])
  })
})

