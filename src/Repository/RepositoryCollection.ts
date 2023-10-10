import SequenceRepository from './Entities/SequenceRepository'
import MarketplaceRepository from './Entities/MarketplaceRepository'
import SubscriptionRepository from './Entities/SubscriptionRepository'
import CrawlerRepository from './Entities/CrawlerRepository'
import CustomerHaendlerbundRepository from './Entities/CustomerHaendlerbundRepository'
import CustomerHaendlerbundMetricRepository from './Entities/CustomerHaendlerbundMetricRepository'
import CustomerMehrwertsteuercheckRepository from './Entities/CustomerMehrwertsteuercheckRepository'
import MemoryRepository from './Entities/MemoryRepository'
import ScoreRepository from './Entities/ScoreRepository'
import AlertingPolicyRepository from './Entities/AlertingPolicyRepository'
import AlertingChannelRepository from './Entities/AlertingChannelRepository'
import WebsocketRepository from './Entities/WebsocketRepository'
import MetricRepository from './Entities/MetricRepository'
import AuthRepository from './Entities/AuthRepository'
import ClusterUserRepository from './Entities/ClusterUserRepository'
import UserRepository from './Entities/UserRepository'
import UserSubscriptionRepository from './Entities/UserSubscriptionRepository'
import InvitationRepository from './Entities/InvitationRepository'
import ClusterCompanyRepository from './Entities/ClusterCompanyRepository'
import ComponentRepository from './Entities/ComponentRepository'
import ProjectRepository from './Entities/ProjectRepository'
import SystemRepository from './Entities/SystemRepository'
import ScreenshotRepository from './Entities/ScreenshotRepository'
import ToolRepository from './Entities/ToolRepository'
import CheckRepository from './Entities/CheckRepository'
import CheckLighthouseRepository from './Entities/CheckLighthouseRepository'
import CheckA11yRepository from './Entities/CheckA11yRepository'
import CheckBrokenResourceRepository from './Entities/CheckBrokenResourceRepository'
import CheckJavaScriptErrorsRepository from './Entities/CheckJavaScriptErrorsRepository'
import CheckFileSizeRepository from './Entities/CheckFileSizeRepository'
import CheckSitemapRepository from './Entities/CheckSitemapRepository'
import CheckMobileFriendlyRepository from './Entities/CheckMobileFriendlyRepository'
import CheckCertificateRepository from './Entities/CheckCertificateRepository'
import CheckInsecureContentRepository from './Entities/CheckInsecureContentRepository'
import CheckCookieRepository from './Entities/CheckCookieRepository'
import CheckDeadLinksRepository from './Entities/CheckDeadLinksRepository'
import CheckHealthCheckRepository from './Entities/CheckHealthCheckRepository'
import NixstatsRepository from './Entities/NixstatsRepository'
import IncidentRepository from './Entities/IncidentRepository'
import Connection from '../Connection/Connection'
import ApplicationRepository from './Entities/ApplicationRepository'
import LocationRepository from "./Entities/LocationRepository";
import CompanyRepository from "./Entities/CompanyRepository";
import Auth2Repository from "./Entities/Auth2Repository";

/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-06-13
 */
class RepositoryCollection {

  private readonly repositories: any
  private masterConnection: any
  private clusterConnection: any

  constructor() {

    this.masterConnection = false
    this.clusterConnection = false

    this.repositories = {}
    this.repositories.sequence = new SequenceRepository()
    this.repositories.auth2 = new Auth2Repository()
    this.repositories.marketplace = new MarketplaceRepository()
    this.repositories.subscription = new SubscriptionRepository()
    this.repositories.crawler = new CrawlerRepository()
    this.repositories.customerhaendlerbund = new CustomerHaendlerbundRepository()
    this.repositories.customerhaendlerbundmetric = new CustomerHaendlerbundMetricRepository()
    this.repositories.customermehrwertsteuercheck = new CustomerMehrwertsteuercheckRepository()
    this.repositories.memory = new MemoryRepository()
    this.repositories.score = new ScoreRepository()
    this.repositories.alertingpolicy = new AlertingPolicyRepository()
    this.repositories.alertingchannel = new AlertingChannelRepository()
    this.repositories.websocket = new WebsocketRepository()
    this.repositories.metric = new MetricRepository()
    this.repositories.auth = new AuthRepository()
    this.repositories.clusteruser = new ClusterUserRepository()
    this.repositories.user = new UserRepository()
    this.repositories.userSubscription = new UserSubscriptionRepository()
    this.repositories.invitation = new InvitationRepository()
    this.repositories.clustercompany = new ClusterCompanyRepository()
    this.repositories.component = new ComponentRepository()
    this.repositories.project = new ProjectRepository()
    this.repositories.system = new SystemRepository()
    this.repositories.screenshot = new ScreenshotRepository()
    this.repositories.tool = new ToolRepository()
    this.repositories.check = new CheckRepository()
    this.repositories.checklighthouse = new CheckLighthouseRepository()
    this.repositories.checka11y = new CheckA11yRepository()
    this.repositories.checkbrokenresource = new CheckBrokenResourceRepository()
    this.repositories.checkjavascripterrors = new CheckJavaScriptErrorsRepository()
    this.repositories.checkfilesize = new CheckFileSizeRepository()
    this.repositories.checksitemap = new CheckSitemapRepository()
    this.repositories.checkmobilefriendly = new CheckMobileFriendlyRepository()
    this.repositories.checkcertificate = new CheckCertificateRepository()
    this.repositories.checkinsecurecontent = new CheckInsecureContentRepository()
    this.repositories.checkcookie = new CheckCookieRepository()
    this.repositories.checkdeadlinks = new CheckDeadLinksRepository()
    this.repositories.checkhealthcheck = new CheckHealthCheckRepository()
    this.repositories.nixstats = new NixstatsRepository()
    this.repositories.incident = new IncidentRepository()
    this.repositories.application = new ApplicationRepository()
    this.repositories.location = new LocationRepository()

    this.repositories.company = new CompanyRepository()
  }

  setClusterConnection(connection: Connection) {
    this.clusterConnection = connection
  }

  setMasterConnection(connection: Connection) {
    this.masterConnection = connection
  }

  getRepository(entityType: string) {
    const repositoryName = entityType.toLowerCase()
    if (repositoryName in this.repositories) {
      const repo = this.repositories[repositoryName]
      if (repo.getConnectionType() === 'ClusterConnection') {
        repo.setConnection(this.clusterConnection)
      } else {
        repo.setConnection(this.masterConnection)
      }
      return this.repositories[repositoryName]
    }
      throw new Error('No repository with name ' + repositoryName + ' found. Registered repositories are: ' + JSON.stringify(Object.keys(this.repositories)))

  }

  getAuth2Repository(): Auth2Repository {
    return this.getRepository('Auth2')
  }

  getSequenceRepository(): SequenceRepository {
      return this.getRepository('Sequence')
  }

  getMarketplaceRepository(): MarketplaceRepository {
      return this.getRepository('Marketplace')
  }

  getSubscriptionRepository(): SubscriptionRepository {
      return this.getRepository('Subscription')
  }

  getCrawlerRepository(): CrawlerRepository {
      return this.getRepository('Crawler')
  }

  getCustomerHaendlerbundRepository(): CustomerHaendlerbundRepository {
      return this.getRepository('CustomerHaendlerbund')
  }

  getCustomerHaendlerbundMetricRepository(): CustomerHaendlerbundMetricRepository {
      return this.getRepository('CustomerHaendlerbundMetric')
  }

  getCustomerMehrwertsteuercheckRepository(): CustomerMehrwertsteuercheckRepository {
      return this.getRepository('CustomerMehrwertsteuercheck')
  }

  getMemoryRepository(): MemoryRepository {
      return this.getRepository('Memory')
  }

  getScoreRepository(): ScoreRepository {
      return this.getRepository('Score')
  }

  getAlertingPolicyRepository(): AlertingPolicyRepository {
      return this.getRepository('AlertingPolicy')
  }

  getAlertingChannelRepository(): AlertingChannelRepository {
      return this.getRepository('AlertingChannel')
  }

  getWebsocketRepository(): WebsocketRepository {
      return this.getRepository('Websocket')
  }

  getMetricRepository(): MetricRepository {
      return this.getRepository('Metric')
  }

  getAuthRepository(): AuthRepository {
      return this.getRepository('Auth')
  }

  getClusterUserRepository(): ClusterUserRepository {
      return this.getRepository('ClusterUser')
  }

  getUserRepository(): UserRepository {
      return this.getRepository('User')
  }

  getUserSubscriptionRepository(): UserSubscriptionRepository {
      return this.getRepository('UserSubscription')
  }

  getInvitationRepository(): InvitationRepository {
      return this.getRepository('Invitation')
  }

  getClusterCompanyRepository(): ClusterCompanyRepository {
      return this.getRepository('ClusterCompany')
  }

  getComponentRepository(): ComponentRepository {
      return this.getRepository('Component')
  }

  getProjectRepository(): ProjectRepository {
      return this.getRepository('Project')
  }

  getSystemRepository(): SystemRepository {
      return this.getRepository('System')
  }

  getScreenshotRepository(): ScreenshotRepository {
      return this.getRepository('Screenshot')
  }

  getToolRepository(): ToolRepository {
      return this.getRepository('Tool')
  }

  getCheckRepository(): CheckRepository {
      return this.getRepository('Check')
  }

  getCheckLighthouseRepository(): CheckLighthouseRepository {
      return this.getRepository('CheckLighthouse')
  }

  getCheckA11yRepository(): CheckA11yRepository {
      return this.getRepository('CheckA11y')
  }

  getCheckBrokenResourceRepository(): CheckBrokenResourceRepository {
      return this.getRepository('CheckBrokenResource')
  }

  getCheckJavaScriptErrorsRepository(): CheckJavaScriptErrorsRepository {
      return this.getRepository('CheckJavaScriptErrors')
  }

  getCheckFileSizeRepository(): CheckFileSizeRepository {
      return this.getRepository('CheckFileSize')
  }

  getCheckSitemapRepository(): CheckSitemapRepository {
      return this.getRepository('CheckSitemap')
  }

  getCheckMobileFriendlyRepository(): CheckMobileFriendlyRepository {
      return this.getRepository('CheckMobileFriendly')
  }

  getCheckCertificateRepository(): CheckCertificateRepository {
      return this.getRepository('CheckCertificate')
  }

  getCheckInsecureContentRepository(): CheckInsecureContentRepository {
      return this.getRepository('CheckInsecureContent')
  }

  getCheckCookieRepository(): CheckCookieRepository {
      return this.getRepository('CheckCookie')
  }

  getCheckDeadLinksRepository(): CheckDeadLinksRepository {
      return this.getRepository('CheckDeadLinks')
  }

  getCheckHealthCheckRepository(): CheckHealthCheckRepository {
      return this.getRepository('CheckHealthCheck')
  }

  getNixstatsRepository(): NixstatsRepository {
      return this.getRepository('Nixstats')
  }

  getIncidentRepository(): IncidentRepository {
      return this.getRepository('Incident')
  }

  getApplicationRepository(): ApplicationRepository {
    return this.getRepository('Application')
  }

  getLocationRepository(): LocationRepository {
    return this.getRepository('Location')
  }

  getCompanyRepository(): CompanyRepository {
    return this.getRepository('Company')
  }
}

export default RepositoryCollection
