import {LeankoalaClient} from '../../src/360ApiClient'
import BadRequestError from '../../src/Connection/BadRequestError'
import 'dotenv/config'

describe('Check badrequest', () => {
  test('Check if client handles bad requests correctly', async () => {
    const username = process.env['TEST_USERNAME'] || 'features@leankoala.com'
    const password = process.env['TEST_PASSWORD'] || 'langner'

    const client = new LeankoalaClient('stage')
    await client.connect({ username, password })

    const repo = await client.getRepositoryCollection().then(res => res.getProjectRepository())
    try {
      await repo.search({user: 3323434})
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toContain('with id')
        expect(error.url).toContain('project/projects/search')
        expect(error.data.user).toContain('is not')
      } else {
        expect(false).toBeFalsy()
      }
    }

  })
})


