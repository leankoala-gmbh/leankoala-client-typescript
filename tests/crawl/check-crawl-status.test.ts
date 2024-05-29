import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check check crawl status', () => {
  test('Check that crawl status can be returned', async () => {
    const client = await createClient();
    const crawlerRepository = (await client.getRepositoryCollection()).getCrawlerRepository()

    const crawl = await crawlerRepository.getCrawlerStatus(7701)

    expect(crawl).toMatchObject(
      {
        project: {running: expect.any(Number), queued: expect.any(Number)},
        global: {running: expect.any(Number), queued: expect.any(Number)}
      })
  })
})
