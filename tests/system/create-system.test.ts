import 'dotenv/config'
import {createClient} from '../client/connect.test';

describe('Check system create', () => {
  test('Check that a system can be created', async () => {
    const client = await createClient();
    const systemRepository = (await client.getRepositoryCollection()).getSystemRepository()

    const system = await systemRepository.createSystem({
      system_type: 15,
      name: 'Test',
      base_url: 'https://test.com',
      owner: client.getUser().id,
      add_standard_alerting: false,
      add_checklist_checks: true,
      add_support_user: true,
      system_size: 2,
      location: 'de'
    })

    expect(system.system.id).toBeGreaterThan(0)
    expect(system.system.name).toBe('Test')
    expect(system.system.url).toBe('https://test.com')
    expect(system.system.system_size).toStrictEqual({id: 2, name: 'Pro'})
    expect(system.project.location).toBe('de')
  })

  test('Check that a system cannot be created if no system_size is available', async () => {
    const client = await createClient();
    const systemRepository = (await client.getRepositoryCollection()).getSystemRepository()

    try {
      await systemRepository.createSystem({
        system_type: 15,
        name: 'Test',
        base_url: 'https://test.com',
        owner: client.getUser().id,
        add_standard_alerting: false,
        add_checklist_checks: true,
        add_support_user: true,
        system_size: 1,
        location: 'de'
      })
    } catch (e: any) {
      expect(e.message).toBe('Unable to create system. The given company has no free systems left.')
    }
  })
})

