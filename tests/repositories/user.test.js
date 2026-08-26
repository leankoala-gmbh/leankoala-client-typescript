const LeankoalaClient = require('../../src/360ApiClient')
const axios = require('axios')
const { createDummyToken } = require('../helpers/dummyToken')

/**
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-20
 */

describe('User', () => {

  /**
   * Check if the refresh method is called after a new system was created. This
   * is important as the system creation can change the users access rights.
   *
   * This test dows not create an actual system. Axios is mocked.
   */
  it('Check if a new user can be created', async () => {
    const client = new LeankoalaClient('stage')

    client.connect({
      // Signed locally with a dummy secret — this token authenticates
      // nowhere. It replaces a token taken from a live environment.
      'accessToken': createDummyToken({
        access: {
          owner: 'test_owner',
          'user.create': { provider: ['koality'] }
        },
        exp: Math.floor(Date.now() / 1000) + 3600
      }),
      axios
    })

    const userRepo = await client.getRepository('User')

    try {
      // await userRepo.create('koality', { username: 'nils' })

      await userRepo.create('koality', {
        username: '123',
        email: 'nils.langner@leankoala.com',
        password: '123123'
        // company_id: this.form.company
      })
      this.isRegistered = true
    } catch (e) {
      expect(e.message).toContain('Username')
    }
  })
})
