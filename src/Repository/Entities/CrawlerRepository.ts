import Repository from '../Repository'

export interface ISetCheckStatusResult{
  url_check_status? : boolean
}


export interface IRunCrawlArguments {
  user: number
  checklist_name?: string
  collections?: any[]
  name: string
  system: number
  depth?: number
  path?: string
  parallel_requests?: number
}

export interface IRunCompanyCrawlArguments {
  user: number
  checklist_name?: string
  collections?: any[]
  name: string
  depth?: number
  path: string
  parallel_requests?: number
}

export interface IListCrawlsArguments {
  checklist_name?: string
  system: number
}

export interface IListCompanyCrawlsArguments {
  pagination_start?: number
  pagination_size?: number
  include_collections?: boolean
}

export interface ISetCheckStatusArguments {
  check_type: 'BrokenLink' | 'DeadLink' | 'JsErrorScanner' | 'JsErrorScanner_external' | 'SiteInfoBigFile' | 'SiteInfoFileSize'
  check_status: 'false_positive'
  url: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class CrawlerRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Run a crawl for a given checklist
   *
   * request url: /kapi/v1/crawler/crawl/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.user The user (id) that starts the crawl and gets informed when the crawl
   *                            finishes
   * @param {String} args.checklist_name The check lists name (optional)
   * @param {Array} args.collections The additional collections (optional)
   * @param {String} args.name The crawls name
   * @param {Number} args.system The systems id
   * @param {Number} args.depth Number of URLs to be crawled (default: 5)
   * @param {String} args.path The URL the crawler starts to crawl (default: /)
   * @param {Number} args.parallel_requests Number of parallel requests that can be done (default: 8)
   */
  async runCrawl(project, args: IRunCrawlArguments): Promise<any> {
    const route = { path: 'crawler/crawl/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['user', 'name', 'system']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Run a crawl for a given checklist
   *
   * request url: /kapi/v1/crawler/crawl/company/{company}
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.user The user (id) that starts the crawl and gets informed when the crawl
   *                            finishes
   * @param {String} args.checklist_name The check lists name (optional)
   * @param {Array} args.collections The additional collections (optional)
   * @param {String} args.name The crawls name
   * @param {Number} args.depth Number of URLs to be crawled (default: 50)
   * @param {String} args.path The URL the crawler starts to crawl
   * @param {Number} args.parallel_requests Number of parallel requests that can be done (default: 8)
   */
  async runCompanyCrawl(company, args: IRunCompanyCrawlArguments): Promise<any> {
    const route = { path: 'crawler/crawl/company/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['user', 'name', 'path']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return all crawl by the given parameters
   *
   * request url: /kapi/v1/crawler/crawl/{project}/crawls
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.checklist_name The check lists name (optional)
   * @param {Number} args.system The systems id
   */
  async listCrawls(project, args: IListCrawlsArguments): Promise<any> {
    const route = { path: 'crawler/crawl/{project}/crawls', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['system']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return all crawl of the given company
   *
   * request url: /kapi/v1/crawler/crawl/company/{company}/crawls
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.pagination_start  (optional)
   * @param {Number} args.pagination_size  (default: 25)
   * @param {Boolean} args.include_collections  (default: false)
   */
  async listCompanyCrawls(company, args: IListCompanyCrawlsArguments): Promise<any> {
    const route = { path: 'crawler/crawl/company/{company}/crawls', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Abort a running crawl. The effect can take up to 5 minutes.
   *
   * request url: /kapi/v1/crawler/crawl/{project}/{crawl}
   * request method: PUT
   *
   * @param project
   * @param crawl
   * @param {Object} args
   */
  async abortCrawl(project, crawl): Promise<any> {
    const route = { path: 'crawler/crawl/{project}/{crawl}', method: 'PUT', version: 1 }
    const argList = Object.assign({ project, crawl }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return the detailed information for a given crawl with all results.
   *
   * request url: /kapi/v1/crawler/crawl/detail/{crawl}
   * request method: POST
   *
   * @param crawl
   * @param {Object} args
   */
  async getCrawl(crawl): Promise<any> {
    const route = { path: 'crawler/crawl/detail/{crawl}', method: 'POST', version: 1 }
    const argList = Object.assign({ crawl }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return the detailed information for a given crawl with all results (as CSV).
   *
   * request url: /kapi/v1/crawler/crawl/detail/csv/{crawl}/{downloadSecret}
   * request method: GET
   *
   * @param crawl
   * @param downloadSecret
   * @param {Object} args
   */
  async getCrawlCsv(crawl, downloadSecret): Promise<any> {
    const route = { path: 'crawler/crawl/detail/csv/{crawl}/{downloadSecret}', method: 'GET', version: 1 }
    const argList = Object.assign({ crawl, downloadSecret }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return the crawler status for a given project.
   *
   * request url: /kapi/v1/crawler/status/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getCrawlerStatus(project): Promise<any> {
    const route = { path: 'crawler/status/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return the crawler status for a given company.
   *
   * request url: /kapi/v1/crawler/status/company/{company}
   * request method: POST
   *
   * @param company
   * @param {Object} args
   */
  async getCompanyCrawlerStatus(company): Promise<any> {
    const route = { path: 'crawler/status/company/{company}', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Get all collections that can be crawled.
   * request url: /kapi/v1/crawler/collections
   * request method: POST
   *
   * @param {Object} args
   */
  async getCrawlableCollections(): Promise<any> {
    const route = { path: 'crawler/collections', method: 'POST', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Set check status for a single url
   *
   * request url: /kapi/v1/crawler/company/{company}/check/status
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {*} args.check_type The check type (DeadLink)
   * @param {*} args.check_status The status that should be set
   * @param {String} args.url The url that status is valid for
   *
   * @return ISetCheckStatusResult
   */
  async setCheckStatus(company, args: ISetCheckStatusArguments): Promise<ISetCheckStatusResult> {
    const route = { path: 'crawler/company/{company}/check/status', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['check_type', 'check_status', 'url']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Delete check status by id
   *
   * request url: /kapi/v1/crawler/company/{company}/check/status/{crawlUrlStatus}
   * request method: DELETE
   *
   * @param company
   * @param crawlUrlStatus
   * @param {Object} args
   */
  async deleteCheckStatus(company, crawlUrlStatus): Promise<any> {
    const route = { path: 'crawler/company/{company}/check/status/{crawlUrlStatus}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ company, crawlUrlStatus }, {})

    return this.connection.send(route, argList)
  }

  /**
   * List check status by company
   *
   * request url: /kapi/v1/crawler/company/{company}/check/status
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async listCheckStatus(company): Promise<any> {
    const route = { path: 'crawler/company/{company}/check/status', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

}

export default CrawlerRepository
