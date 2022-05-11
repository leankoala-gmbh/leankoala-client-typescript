/**
 * TODO: Check response interface
 */
import {IRCheckGlobComponent, IRCheckGlobSuggestion} from '../global/checkRepos.interface'

interface IRCheckJSErrorsComponent extends IRCheckGlobComponent {
  suggestion?: IRCheckGlobSuggestion
}

export interface IRCheckJSErrorsResultsResponse {
  component: IRCheckJSErrorsComponent
  error?: string
  results?: {
    [key: string]: {
      component: {
        id: number
        name: string
        url: string
      }
      javascript_errors: {
        error: string
        type: string
      }[]
    }
  }
}

export interface IRCheckJSErrors {
  getResults(system, args): Promise<IRCheckJSErrorsResultsResponse>
}
