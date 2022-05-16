import {LeankoalaClient} from '../../src/360ApiClient'
import {consoleLogger} from '../../src/EventHandler/consoleLogger'
import 'dotenv/config'

describe('Check Eventlistner', () => {
  test('Check if the events are published', async () => {
    const username = process.env['TEST_USERNAME'] || 'demo'
    const password = process.env['TEST_PASSWORD'] || 'demo'

    const client = new LeankoalaClient('stage')
    await client.connect({ username, password })

    client.on('send', consoleLogger)

    const user = client.getUser()

    client.setLanguage('de')

    const repos = await client.getRepositoryCollection()
    const projectRepo = await client.getRepository('project')
    const project = await projectRepo.search({user: user.id})
    // const incidentRepo = await repos.getIncidentRepository()
    console.log('sdfsdf',  project)
    // const projects = await projectRepo.search({user: user.id})
    // console.log(projects)
    // const project = projects[ 'projects' ].pop()
    //
    // const [incidentsDe, incidentsEn] = await Promise.all([
    //   incidentRepo.search(project.id),
    //   incidentRepo.search(project.id)
    // ])
    //
    //
    // expect(incidentsDe[ 'incidents' ].length).toBeGreaterThan(0)
    // expect(incidentsDe[ 'incidents' ].pop().message).toContain('tote Links')
    //
    // client.setLanguage('en')
    //
    //
    // expect(incidentsEn[ 'incidents' ].length).toBeGreaterThan(0)
    // expect(incidentsEn[ 'incidents' ].pop().message).toContain('dead')

  })
})

