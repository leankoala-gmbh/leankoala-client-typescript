const LeankoalaClient = require('../../src/360ApiClient')
const moxios = require('moxios')
const axios = require('axios')
const { createDummyToken } = require('../helpers/dummyToken')

// Claim sets kept byte-for-byte identical to the fixtures they replace, so the
// mocked exchange behaves exactly as before. Only the signature changed: these
// are now signed locally with a dummy secret instead of being real tokens
// captured from a live environment.
const MOCK_ACCESS_TOKEN = createDummyToken({
  access: { 'project.create': {} },
  current_timestamp: 1595272393,
  user_id: 163,
  exp: 3000000003,
  ttl: 900
})

const MOCK_REFRESH_TOKEN = createDummyToken({
  access: { 'token.refresh': { user: [163] } },
  current_timestamp: 1595272393,
  user_id: 163,
  exp: 1595358793,
  ttl: 86400
})

/**
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-20
 */
describe('Refresh', () => {
  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  /**
   * Check if the refresh method is called after a new system was created. This
   * is important as the system creation can change the users access rights.
   *
   * This test dows not create an actual system. Axios is mocked.
   */
  it('Check if token refresh is called', async () => {
    const client = new LeankoalaClient('stage')

    moxios.wait(() => {
      const connectRequest = moxios.requests.at(0)
      connectRequest.respondWith({
        status: 200,
        response: {
          status: 'success', data:
            {
              token: MOCK_ACCESS_TOKEN,
              refresh_token: MOCK_ACCESS_TOKEN,
              user: { id: 163, username: 'demo', first_name: null, last_name: null }
            }
        }
      })
    })

    moxios.wait(() => {
      const createSystemRequest = moxios.requests.at(1)
      createSystemRequest.respondWith({
        status: 200,
        response: { status: 'success', data: { system: { id: 0 } } }
      })
    })

    moxios.wait(() => {
      const refreshAccessRequest = moxios.requests.at(2)
      refreshAccessRequest.respondWith({
        status: 200,
        response: { status: 'failure', message: 'Refresh method was called' }
      })
    })

    await client.connect({ username: 'demo', password: 'demo', axios })

    const systemRepository = await client.getRepository('system')

    try {
      const system = await systemRepository.createSystem({
        owner: 1,
        base_url: 'https://www.leankoala.com',
        name: 'Shop1',
        system_type: 1
      })
    } catch (e) {
      expect(e.message).toContain('Refresh method was called')
    }
  })
})
