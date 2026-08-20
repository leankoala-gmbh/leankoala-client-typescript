const crypto = require('crypto')

/**
 * A secret that is deliberately not the API's signing secret. Tokens produced
 * here have the right shape for the client to decode, but no service will ever
 * accept them.
 */
const LOCAL_TEST_SECRET = 'local-test-secret-not-the-api-secret'

/**
 * Sign a JWT locally for use as test data.
 *
 * The tests here used to embed long-lived tokens taken from a live
 * environment. Building them at runtime instead keeps the fixtures readable
 * and keeps anything usable out of the repository.
 *
 * @param {object} payload the claims to encode
 * @returns {string} a structurally valid but unusable HS256 token
 */
function createDummyToken(payload) {
  const encode = (part) => Buffer.from(JSON.stringify(part)).toString('base64url')

  const header = encode({ typ: 'JWT', alg: 'HS256' })
  const body = encode(payload)
  const signature = crypto
    .createHmac('sha256', LOCAL_TEST_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url')

  return `${header}.${body}.${signature}`
}

module.exports = { createDummyToken }
