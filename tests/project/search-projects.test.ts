import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check search projects', () => {
  test('Check that projects are returned', async () => {
    const client = await createClient()
    const projectRepository = (await client.getRepositoryCollection()).getProjectRepository()

    const projects = await projectRepository.search({user: client.getUser().id})

    expect(projects.projects[0]).toMatchObject({
      id: expect.any(Number),
      identifier: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
    })
  })
})

