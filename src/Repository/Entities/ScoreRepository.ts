import Repository from '../Repository'


export interface IGetScoresByUserArguments {
  scores: any[]
  with_sub_scores?: boolean
  filter_empty_projects?: boolean
}

export interface IGetScoresArguments {
  scores: any[]
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class ScoreRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Return a list of scores by the given score names for all projects and systems the user is part of.
   *
   * request url: /kapi/v1/score/scores/user/{user}
   * request method: POST
   *
   * @param user
   * @param {Object} args
   * @param {Array} args.scores List of score names
   * @param {Boolean} args.with_sub_scores NOT IMPLEMENTED YET: If true detailed information about the
   *                                       score will be provided. (default: false)
   * @param {Boolean} args.filter_empty_projects If true the only projects with systems are returned (default: false)
   */
  async getScoresByUser(user, args: IGetScoresByUserArguments): Promise<any> {
    const route = { path: 'score/scores/user/{user}', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['scores']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return the score for a given score name.
   *
   * request url: /kapi/v1/score/scores/{system}/{scoreName}
   * request method: POST
   *
   * @param system
   * @param scoreName
   * @param {Object} args
   */
  async getScore(system, scoreName): Promise<any> {
    const route = { path: 'score/scores/{system}/{scoreName}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, scoreName }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return a list of scores by the given score names.
   *
   * request url: /kapi/v1/score/scores/{system}
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {Array} args.scores list of score names
   */
  async getScores(system, args: IGetScoresArguments): Promise<any> {
    const route = { path: 'score/scores/{system}', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)
    const requiredArguments = ['scores']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

}

export default ScoreRepository
