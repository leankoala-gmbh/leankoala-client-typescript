/**
 * Credentials for the tests that talk to the live stage API.
 *
 * There is deliberately no fallback value. These tests used to default to a
 * shared real account when the environment was not set up, which is how those
 * credentials ended up committed. A missing variable must stop the run
 * instead.
 */
export function requireTestCredentials(): { username: string, password: string } {
  const username = process.env['TEST_USERNAME']
  const password = process.env['TEST_PASSWORD']

  if (!username || !password) {
    throw new Error(
      'TEST_USERNAME and TEST_PASSWORD must both be set to run this test. ' +
      'These tests authenticate against the live stage API, so they need a ' +
      'dedicated test account — copy .env.example to .env and fill it in. ' +
      'There is no default account by design.'
    )
  }

  return { username, password }
}
