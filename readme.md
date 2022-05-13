[![Actions Status](https://github.com/leankoala-gmbh/leankoala-client-js/workflows/Run%20JEST%20tests/badge.svg)](https://github.com/leankoala-gmbh/leankoala-client-js/actions?query=workflow%3A%22Run+JEST+tests%22) [![DeepScan grade](https://deepscan.io/api/teams/10108/projects/12794/branches/203150/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10108&pid=12794&bid=203150)

# 360 API Client

The library is used to communicate with the 360 Monitoring Engine. 

Please contact `api@koalityengine.com` if you want to use the API.

## Multi language support
The KoalityEngine API can return the results in different languages. The preferred language can be defined in the
connect argument or later on via the `setLanguage` method.

```js
await client.connect({ username: 'demo', password: 'demo', language: 'de' })
// or
client.setLanguage('de')
```

## Connect
```js
// via username and password
await client.connect({ username: 'demo', password: 'demo' })

// via wakeup token
await client.connect({ wakeUpToken })

// via refresh token
await client.connect({ refreshToken, userId })
```

## Examples
This example returns a list of projects the user `demo` is part of.

```js
import { LeankoalaClient } from '@webpros/360-api-client'

(async () => {
  const client = new LeankoalaClient('stage')
  await client.connect({ username: 'demo', password: 'demo' })

  const user = client.getUser()
  console.log('user', user)

  const alerts = client
    .getRepositoryCollection()
    .getAlertingChannelRepository()
  const alertList = await alerts.list(3333)
})()

```

## Repositories
