import {IRepoSubscription} from './repos/subscriptionRepo.interface'
import {IRWebsocket} from './repos/websocketRepo.interface'
import {IRAlertingChannel} from './repos/alertingChannelRepo.interface'
import {IRAlertingPolicy} from './repos/alertingPolicyRepo.interface'
import {IRAuth} from './repos/authRepo.interface'
import {IRCheckA11Y} from './repos/checkA11YRepo.interface'
import {IRCheckBrokenResource} from './repos/checkBrokenResourceRepo.interface'
import {IRCheckCertificate} from './repos/checkCertificateRepo.interfaces'
import {IRCheckCookies} from './repos/checkCookiesRepo.interface'
import {IRCheckDeadlinks} from './repos/checkDeadlinksRepo.interface'
import {IRCheckFilesize} from './repos/checkFilesizeRepo.interface'
import {IRCheckHealthCheck} from './repos/checkHealthCheckRepo.interface'
import {IRCheckInsecureContent} from './repos/checkInsecureContentRepo.interface'
import {IRCheckJSErrors} from './repos/checkJSErrorsRepo.interface'

export interface IRepositoryCollectionRepo {
  _connectionType: ConnectionType
}

export enum ConnectionType {
  ClusterConnection = 'ClusterConnection',
  MasterConnection = 'MasterConnection',
}

export interface IRepositoryCollectionRepos {
  sequence: IRepositoryCollectionRepo
  marketplace: IRepositoryCollectionRepo
  subscription: IRepoSubscription
  crawler: IRepositoryCollectionRepo
  customerhaendlerbund: IRepositoryCollectionRepo
  customerhaendlerbundmetric: IRepositoryCollectionRepo
  customermehrwertsteuercheck: IRepositoryCollectionRepo
  memory: IRepositoryCollectionRepo
  score: IRepositoryCollectionRepo
  alertingpolicy: IRAlertingPolicy
  AlertingChannelRepository: IRAlertingChannel
  websocket: IRWebsocket
  metric: IRepositoryCollectionRepo
  auth: IRAuth
  clusteruser: IRepositoryCollectionRepo
  user: IRepositoryCollectionRepo
  invitation: IRepositoryCollectionRepo
  component: IRepositoryCollectionRepo
  project: IRepositoryCollectionRepo
  system: IRepositoryCollectionRepo
  screenshot: IRepositoryCollectionRepo
  tool: IRepositoryCollectionRepo
  check: IRepositoryCollectionRepo
  checklighthouse: IRepositoryCollectionRepo
  checka11y: IRCheckA11Y
  checkbrokenresource: IRCheckBrokenResource
  checkjavascripterrors: IRCheckJSErrors
  checkfilesize: IRCheckFilesize
  checksitemap: IRepositoryCollectionRepo
  checkmobilefriendly: IRepositoryCollectionRepo
  checkcertificate: IRCheckCertificate
  checkinsecurecontent: IRCheckInsecureContent
  checkcookie: IRCheckCookies
  checkdeadlinks: IRCheckDeadlinks
  checkhealthcheck: IRCheckHealthCheck
  nixstats: IRepositoryCollectionRepo
  incident: IRepositoryCollectionRepo
  twoFactor: IRepositoryCollectionRepo
}

export interface IClientConnectArgs {
  username?: string
  password?: string
  wakeUpToken?: string
  refreshToken?: string
  accessToken?: string
  withMemories?: boolean
  language?: string
  axiosAdapter?: any
  autoSelectCompany?: boolean
  axios?: any
  sessionToken?: string
}

export interface ITokenObject {
  master: string
  company: boolean
  user: string
  cluster?: string
}

export interface IInitConnectionArgs {
  axios: any
  noLogin?: boolean
  wakeUpToken?: string
  accessToken?: string
  refreshToken?: string
  autoSelectCompany?: boolean
}

export interface IInitConnectionViaWakeUpTokenArgs {
  wakeUpToken?: string
  axios: any
}

export interface IInitConnectionViaMasterTokens extends IClientConnectArgs {
  user?: {
    id: string
    companies: string[]
  }
}

export interface ISwitchClusterArgs {
  apiEndpoint: string
}
