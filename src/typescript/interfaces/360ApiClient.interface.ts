import {IRAlertingChannel} from './repos/alertingChannelRepo.interface'
// import {IRepoSubscription} from './repos/subscriptionRepo.interface'
// import {IRWebsocket} from './repos/websocketRepo.interface'
// import {IRAlertingPolicy} from './repos/alertingPolicyRepo.interface'
// import {IRAuth} from './repos/authRepo.interface'
// import {IRCheckA11Y} from './repos/checkA11YRepo.interface'
// import {IRCheckBrokenResource} from './repos/checkBrokenResourceRepo.interface'
// import {IRCheckCertificate} from './repos/checkCertificateRepo.interfaces'
// import {IRCheckCookies} from './repos/checkCookiesRepo.interface'
// import {IRCheckDeadlinks} from './repos/checkDeadlinksRepo.interface'
// import {IRCheckFilesize} from './repos/checkFilesizeRepo.interface'
// import {IRCheckHealthCheck} from './repos/checkHealthCheckRepo.interface'
// import {IRCheckInsecureContent} from './repos/checkInsecureContentRepo.interface'
// import {IRCheckJSErrors} from './repos/checkJSErrorsRepo.interface'
// import {IRCheckLighthouse} from './repos/checkLighthouseRepo.interface'
// import {IRCheckMobileFriendly} from './repos/checkMobileFriendlyRepo.interface'
// import {IRCheck} from './repos/checkRepo.interface'

export enum EEnvironment {
  Local = 'local',
  Stage = 'stage',
  Production = 'production',
}

export enum EServer {
  Local = 'http://localhost:8082/',
  Stage = 'https://auth.stage.koalityengine.com/',
  Production = 'https://auth.koalityengine.com/',
}
export interface IRepositoryCollectionRepo {
  _connectionType: ConnectionType
}

export enum ConnectionType {
  ClusterConnection = 'ClusterConnection',
  MasterConnection = 'MasterConnection',
}

export interface IRepositoryCollectionRepos {
  alertingchannel: IRAlertingChannel
  // sequence: IRepositoryCollectionRepo
  // marketplace: IRepositoryCollectionRepo
  // subscription: IRepoSubscription
  // crawler: IRepositoryCollectionRepo
  // customerhaendlerbund: IRepositoryCollectionRepo
  // customerhaendlerbundmetric: IRepositoryCollectionRepo
  // customermehrwertsteuercheck: IRepositoryCollectionRepo
  // memory: IRepositoryCollectionRepo
  // score: IRepositoryCollectionRepo
  // alertingpolicy: IRAlertingPolicy
  // websocket: IRWebsocket
  // metric: IRepositoryCollectionRepo
  // auth: IRAuth
  // clusteruser: IRepositoryCollectionRepo
  // user: IRepositoryCollectionRepo
  // invitation: IRepositoryCollectionRepo
  // component: IRepositoryCollectionRepo
  // project: IRepositoryCollectionRepo
  // system: IRepositoryCollectionRepo
  // screenshot: IRepositoryCollectionRepo
  // tool: IRepositoryCollectionRepo
  // check: IRCheck
  // checklighthouse: IRCheckLighthouse
  // checka11y: IRCheckA11Y
  // checkbrokenresource: IRCheckBrokenResource
  // checkjavascripterrors: IRCheckJSErrors
  // checkfilesize: IRCheckFilesize
  // checksitemap: IRepositoryCollectionRepo
  // checkmobilefriendly: IRCheckMobileFriendly
  // checkcertificate: IRCheckCertificate
  // checkinsecurecontent: IRCheckInsecureContent
  // checkcookie: IRCheckCookies
  // checkdeadlinks: IRCheckDeadlinks
  // checkhealthcheck: IRCheckHealthCheck
  // nixstats: IRepositoryCollectionRepo
  // incident: IRepositoryCollectionRepo
}

export interface IRepositoryCollection {
  setMasterConnection: any
  setClusterConnection: any
  getRepository: any
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
  axios: any
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
