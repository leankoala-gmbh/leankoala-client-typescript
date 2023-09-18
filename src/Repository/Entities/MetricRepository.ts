import Repository from '../Repository'


export interface IFindBySystemArguments {
  tool?: any
  tools?: any[]
  metric_type?: 'value' | 'status'
  filter_trailing_nulls?: boolean
  min_value?: number
  time?: string
  from?: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2023-09-18
 */
class MetricRepository extends Repository {

  constructor() {
    super()
    this.connectionType = 'ClusterConnection'
  }

  /**
   * Search for the metrics for all eventIdentifiers in the given projects that are defined by the given
   * tool.
   *
   * request url: /kapi/v1/metric/eventidentifier/{system}/search
   * request method: POST
   *
   * @param system
   * @param {Object} args
   * @param {*} args.tool A single tool id or the identifier of a tool. (optional)
   * @param {Array} args.tools A list of tool ids. For every tool there will be a metric array returned. (optional)
   * @param {*} args.metric_type The engine stores to kinds of metrics. Status and Value. The status
   *                                 is the ratio between successful checks and failed in percent, the
   *                                 value is the average value of the checks result. (default: value)
   * @param {Boolean} args.filter_trailing_nulls Remove null values from the metric if they are at the
   *                                             beginning. Trailing nulls are used of the metric does
   *                                             not provide values for a given time spam. (default: true)
   * @param {Number} args.min_value Replace all values that are smaller than the min value with the min
   *                                 value. (default: 0)
   * @param {String} args.time The time group the datapoint are aggregated. (default: 24h)
   * @param {String} args.from The interval you want to get the data from. (default: -1month)
   */
  async findBySystem(system, args: IFindBySystemArguments): Promise<any> {
    const route = { path: 'metric/eventidentifier/{system}/search', method: 'POST', version: 1 }
    const argList = Object.assign({ system }, args)

    return this.connection.send(route, argList)
  }

}

export default MetricRepository
