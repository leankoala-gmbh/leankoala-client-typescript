import {TCheckSystem} from '../global/checkRepos.interface'

export interface ICheckRepoAddByChecklistArgs {
  checklist: string | number
  clear_before?: boolean
  activate_checks?: boolean
}

export interface IRCheck {
  addByChecklist(system: TCheckSystem, args: ICheckRepoAddByChecklistArgs): Promise<any>
  addByRecipe(args: {component: number, cookbook: number}): Promise<any>
  runChecksForSystem(system: TCheckSystem, toolIdentifier: string, args?: object): Promise<any>
  showCollections(project, toolIdentifier: string, args: {group: string}): Promise<any>
  showActiveCollections(): Promise<any>
  updateCollections(): Promise<any>
}
