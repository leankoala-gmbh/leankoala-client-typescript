import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check search incidents', () => {
  test('Check that incidents are returned', async () => {
    const client = await createClient()
    const incidentRepository = (await client.getRepositoryCollection()).getIncidentRepository()

    const incidents = await incidentRepository.search(7701)

    expect(incidents.incidents[0]).toMatchObject({
      id: expect.any(Number),
      hash: expect.any(String),
      severity: expect.any(Object),
      system: expect.any(Object),
      component: expect.any(Object),
      tool: expect.any(Object),
      start_date: expect.any(String),
      message: expect.any(String),
      recommendations: expect.any(Array),
      category: expect.any(Array)
    })
  })
})
