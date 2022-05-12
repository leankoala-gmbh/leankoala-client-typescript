import Repository from '../Repository'


export interface ISetComponentArguments {
  url: string
}

export interface IGetHealthStatusArguments {
  from?: string
  time?: string
}

export interface IActivateFeatureArguments {
  projects: any[]
}

export interface IDeactivateFeatureArguments {
  projects: any[]
}

export interface IGetAvailableFeaturesArguments {
  status?: number
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2022-05-12
 */
class MarketplaceRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Return all features that are active for the given project.
   *
   * request url: /kapi/v1/marketplace/features/project/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getActiveProjectFeatures(project): Promise<any> {
    const route = { path: 'marketplace/features/project/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all features that are active for the given provider.
   *
   * request url: /kapi/v1/marketplace/features/provider/{providerIdentifier}
   * request method: GET
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async getActiveProviderFeatures(providerIdentifier): Promise<any> {
    const route = { path: 'marketplace/features/provider/{providerIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ providerIdentifier }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all component suggestions that are enabled by the active features.
   *
   * request url: /kapi/v1/marketplace/features/components/{system}/{featureIdentifier}
   * request method: GET
   *
   * @param system
   * @param featureIdentifier
   * @param {Object} args
   */
  async getComponents(system, featureIdentifier): Promise<any> {
    const route = { path: 'marketplace/features/components/{system}/{featureIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ system, featureIdentifier }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Set a component using a given suggestion as template.
   *
   * request url: /kapi/v1/marketplace/features/components/{system}/{suggestionIdentifier}
   * request method: POST
   *
   * @param system
   * @param suggestionIdentifier
   * @param {Object} args
   * @param {String} args.url 
   */
  async setComponent(system, suggestionIdentifier, args: ISetComponentArguments): Promise<any> {
    const route = { path: 'marketplace/features/components/{system}/{suggestionIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ system, suggestionIdentifier }, args)
    const requiredArguments = ['url']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return all the status of the health checks of the systems components.
   *
   * request url: /kapi/v1/marketplace/features/status/{system}/{featureIdentifier}
   * request method: GET
   *
   * @param system
   * @param featureIdentifier
   * @param {Object} args
   * @param {String} args.from  (default: -1day)
   * @param {String} args.time  (default: 1h)
   */
  async getHealthStatus(system, featureIdentifier, args: IGetHealthStatusArguments): Promise<any> {
    const route = { path: 'marketplace/features/status/{system}/{featureIdentifier}', method: 'GET', version: 1 }
    const argList = Object.assign({ system, featureIdentifier }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Return all features that can be activated for the given company and provider.
   *
   * request url: /kapi/v1/marketplace/marketplace/features/{providerIdentifier}/{company}
   * request method: GET
   *
   * @param providerIdentifier
   * @param company
   * @param {Object} args
   */
  async getFeatures(providerIdentifier, company): Promise<any> {
    const route = { path: 'marketplace/marketplace/features/{providerIdentifier}/{company}', method: 'GET', version: 1 }
    const argList = Object.assign({ providerIdentifier, company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Activate the given feature for the given projects.
   *
   * request url: /kapi/v1/marketplace/marketplace/feature/activate/{company}/{featureIdentifier}
   * request method: POST
   *
   * @param company
   * @param featureIdentifier
   * @param {Object} args
   * @param {Array} args.projects 
   */
  async activateFeature(company, featureIdentifier, args: IActivateFeatureArguments): Promise<any> {
    const route = { path: 'marketplace/marketplace/feature/activate/{company}/{featureIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ company, featureIdentifier }, args)
    const requiredArguments = ['projects']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Deactivate the given feature for the given projects.
   *
   * request url: /kapi/v1/marketplace/marketplace/feature/deactivate/{company}/{featureIdentifier}
   * request method: POST
   *
   * @param company
   * @param featureIdentifier
   * @param {Object} args
   * @param {Array} args.projects 
   */
  async deactivateFeature(company, featureIdentifier, args: IDeactivateFeatureArguments): Promise<any> {
    const route = { path: 'marketplace/marketplace/feature/deactivate/{company}/{featureIdentifier}', method: 'POST', version: 1 }
    const argList = Object.assign({ company, featureIdentifier }, args)
    const requiredArguments = ['projects']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Return all features that are activated for the given project.
   *
   * request url: /kapi/v1/marketplace/marketplace/feature/active/{project}
   * request method: GET
   *
   * @param project
   * @param {Object} args
   */
  async getActiveFeatures(project): Promise<any> {
    const route = { path: 'marketplace/marketplace/feature/active/{project}', method: 'GET', version: 1 }
    const argList = Object.assign({ project }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all features that are activated for the given project.
   *
   * request url: /kapi/v1/marketplace/marketplace/feature/available/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {Number} args.status  (default: 400)
   */
  async getAvailableFeatures(project, args: IGetAvailableFeaturesArguments): Promise<any> {
    const route = { path: 'marketplace/marketplace/feature/available/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)

    return this.connection.send(route, argList)
  }

  /**
   * Return all features that exists.
   * request url: /kapi/v1/marketplace/marketplace/feature/all
   * request method: POST
   *
   * @param {Object} args
   */
  async getAllFeatures(): Promise<any> {
    const route = { path: 'marketplace/marketplace/feature/all', method: 'POST', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return a list of features that where marked as favourites.
   * request url: /kapi/v1/marketplace/marketplace/favourites
   * request method: GET
   *
   * @param {Object} args
   */
  async getFavourites(): Promise<any> {
    const route = { path: 'marketplace/marketplace/favourites', method: 'GET', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Show the booking logs for the company.
   *
   * request url: /kapi/v1/marketplace/log/company/{company}
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getBookingLog(company): Promise<any> {
    const route = { path: 'marketplace/log/company/{company}', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all the status of the health checks of the systems components.
   *
   * request url: /kapi/v1/marketplace/plugins/incidents/system/{system}
   * request method: GET
   *
   * @param system
   * @param {Object} args
   */
  async getSystemPluginStatus(system): Promise<any> {
    const route = { path: 'marketplace/plugins/incidents/system/{system}', method: 'GET', version: 1 }
    const argList = Object.assign({ system }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Return all the status of the health checks of the systems components.
   *
   * request url: /kapi/v1/marketplace/plugins/incidents/user/{user}
   * request method: GET
   *
   * @param user
   * @param {Object} args
   */
  async getUserPluginStatus(user): Promise<any> {
    const route = { path: 'marketplace/plugins/incidents/user/{user}', method: 'GET', version: 1 }
    const argList = Object.assign({ user }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Proxy a REST request 
   *
   * request url: /kapi/v1/marketplace/proxy/{secret}/{url}
   * request method: GET
   *
   * @param secret
   * @param url
   * @param {Object} args
   */
  async restProxy(secret, url): Promise<any> {
    const route = { path: 'marketplace/proxy/{secret}/{url}', method: 'GET', version: 1 }
    const argList = Object.assign({ secret, url }, {})

    return this.connection.send(route, argList)
  }

}

export default MarketplaceRepository
