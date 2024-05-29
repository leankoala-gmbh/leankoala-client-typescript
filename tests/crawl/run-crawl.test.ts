import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check crawl run', () => {
  test('Check that a crawl can be run', async () => {
    const client = await createClient();
    const crawlerRepository = (await client.getRepositoryCollection()).getCrawlerRepository()

    const crawl = await crawlerRepository.runCrawl(7701, {
      user: client.getUser().id,
      name: 'Test crawl',
      checklist_name: '_deadlinks',
      system: 8790
    })

    expect(crawl.identifier.length).toBeGreaterThan(30)
    expect(crawl.queued).toBe(1)
  })


  test('Check that a crawl cannot be run for another project', async () => {
    const client = await createClient();
    const crawlerRepository = (await client.getRepositoryCollection()).getCrawlerRepository()

    try {
      await crawlerRepository.runCrawl(7, {
        user: client.getUser().id,
        name: 'Test crawl',
        checklist_name: '_deadlinks',
        system: 8790
      })
    } catch (e: any) {
      expect(e.message).toMatch('You are not allowed to call this action (action: project.update, scopes: project => 7')
    }
  })
})

