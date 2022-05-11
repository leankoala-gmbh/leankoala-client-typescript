/**
 * TODO: Add Response for Result
 */
import {TCheckSystem} from '../global/checkRepos.interface'

export interface IRCheckLighthouseResultsArgs {
  targetGroup?: number | string
  use_cache?: boolean
}

export interface IRCheckLighthouseResultsResponse {
  response?: any
}

export type TCheckLighthouseSystems = 'performance' | 'seo'

export interface IRCheckLighthouse {
  getResults(system: TCheckSystem, category: TCheckLighthouseSystems, args: IRCheckLighthouseResultsArgs | object): Promise<IRCheckLighthouseResultsResponse>
}
