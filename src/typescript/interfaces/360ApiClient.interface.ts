
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
