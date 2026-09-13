/**
 * Test credentials are supplied by the environment, never by the repository.
 *
 * Copy .env.example to .env and fill it in, or export the variables in the
 * shell. There is deliberately no fallback: a missing variable fails loudly
 * rather than silently authenticating as somebody else's account.
 */

export function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env and fill it in, ` +
      'or export the variable before running the tests.'
    )
  }

  return value
}

export function getTestCredentials(): { username: string, password: string } {
  return {
    username: requireEnv('TEST_USERNAME'),
    password: requireEnv('TEST_PASSWORD')
  }
}
