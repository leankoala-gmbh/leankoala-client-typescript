import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check crawl list', () => {
  test('Check that crawls can be listed', async () => {
    const client = await createClient();
    const crawlerRepository = (await client.getRepositoryCollection()).getCrawlerRepository()

    const crawl = await crawlerRepository.listCrawls(7701, {
      checklist_name: '_deadlinks',
      system: 8790
    })

    expect(crawl.count).toBeGreaterThan(0)
    expect(crawl.crawls[0]).toMatchObject({
      id: expect.any(Number),
      startpage: expect.any(String),
      name: expect.any(String),
      status: expect.any(String),
      failure: expect.any(Number),
      success: expect.any(Number),
      uncertain: expect.any(Number),
      crawl_depth: expect.any(Number),
      start_date: expect.any(String),
      progress: expect.any(Number),
      csvUrl: expect.any(String),
      is_triggered_manually: expect.any(Boolean),
      checklist: expect.any(Object)
    })
  })
})

