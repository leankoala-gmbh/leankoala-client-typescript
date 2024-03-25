import Repository from '../Repository'


export interface ISetCompanyCreditCardPlansArguments {
  quantity: number
  system_size?: number
}

export interface ISetCompanyFreePlansArguments {
  quantity: number
  system_size: number
}

export interface ISetCompanyFreePlansByUserArguments {
  quantity: number
  system_size?: number
  identifier?: string
}

export interface ISetCreditCardArguments {
  stripe_cc_source: any
  last_digits: string
  brand: string
}

export interface ISetBillingAddressArguments {
  company_name: string
  country: string
  postal_code: string
  city: string
  street: string
  usident?: string
  email?: string
}

export interface ISetSubscriptionPlanArguments {
  identifier: string
}

export interface ICreateCheckoutSessionArguments {
  price_id: string
  success_url: string
  cancel_url: string
}

export interface ICreateCustomerPortalSessionArguments {
  return_url: string
}

export interface IUpdateSubscriptionByProjectArguments {
  price_id: string
  success_url: string
  cancel_url: string
}


/**
 * This class was created by the LeanApiBundle.
 *
 * All changes made in this file will be overwritten by the next create run.
 *
 * @created 2024-03-25
 */
class SubscriptionRepository extends Repository {

    constructor() {
        super()
        this.connectionType = 'ClusterConnection'
    }

  /**
   * Get the companies subscription information.
   *
   * request url: /kapi/v1/subscription/company/{company}/
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getCompanySubscription(company): Promise<any> {
    const route = { path: 'subscription/company/{company}/', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Set the companies credit card plans.
   *
   * request url: /kapi/v1/subscription/company/{company}/plans/creditcard
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.quantity The number of packets to be used
   * @param {Number} args.system_size The system size id (optional)
   */
  async setCompanyCreditCardPlans(company, args: ISetCompanyCreditCardPlansArguments): Promise<any> {
    const route = { path: 'subscription/company/{company}/plans/creditcard', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['quantity']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Set the companies free plans.
   *
   * request url: /kapi/v1/subscription/company/{company}/plans/free
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {Number} args.quantity The number of packets to be used
   * @param {Number} args.system_size The system size id
   */
  async setCompanyFreePlans(company, args: ISetCompanyFreePlansArguments): Promise<any> {
    const route = { path: 'subscription/company/{company}/plans/free', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['quantity', 'system_size']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Set the companies free plans by user.
   *
   * request url: /kapi/v1/subscription/user/{user}/plans/free
   * request method: POST
   *
   * @param user
   * @param {Object} args
   * @param {Number} args.quantity The number of packets to be used
   * @param {Number} args.system_size The system size id (optional)
   * @param {String} args.identifier  (optional)
   */
  async setCompanyFreePlansByUser(user, args: ISetCompanyFreePlansByUserArguments): Promise<any> {
    const route = { path: 'subscription/user/{user}/plans/free', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['quantity']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Set the companies credit card.
   *
   * request url: /kapi/v1/subscription/company/{company}/creditcard
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {*} args.stripe_cc_source The stripe credit card id
   * @param {String} args.last_digits The last 4 digits of the credit card
   * @param {String} args.brand The credit cards brand
   */
  async setCreditCard(company, args: ISetCreditCardArguments): Promise<any> {
    const route = { path: 'subscription/company/{company}/creditcard', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['stripe_cc_source', 'last_digits', 'brand']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Set the billing address information for the given company.
   *
   * request url: /kapi/v1/subscription/company/{company}/billingaddress
   * request method: POST
   *
   * @param company
   * @param {Object} args
   * @param {String} args.company_name The companies name.
   * @param {String} args.country The companies billing address country.
   * @param {String} args.postal_code The companies billing address postal code.
   * @param {String} args.city The companies billing address city.
   * @param {String} args.street The companies billing address street.
   * @param {String} args.usident The companies "Umsatzsteuer-Identifikationsnummer". (optional)
   * @param {String} args.email The email address the invoice information gets send to. (optional)
   */
  async setBillingAddress(company, args: ISetBillingAddressArguments): Promise<any> {
    const route = { path: 'subscription/company/{company}/billingaddress', method: 'POST', version: 1 }
    const argList = Object.assign({ company }, args)
    const requiredArguments = ['company_name', 'country', 'postal_code', 'city', 'street']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Get the billing address information for the given company.
   *
   * request url: /kapi/v1/subscription/company/{company}/billingaddress
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getBillingAddress(company): Promise<any> {
    const route = { path: 'subscription/company/{company}/billingaddress', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Get a list of features that are active.
   *
   * request url: /kapi/v1/subscription/company/{company}/features
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getSubscribedFeatures(company): Promise<any> {
    const route = { path: 'subscription/company/{company}/features', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Get a list invoices for the given company.
   *
   * request url: /kapi/v1/subscription/company/{company}/invoices
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getCompanyInvoices(company): Promise<any> {
    const route = { path: 'subscription/company/{company}/invoices', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Set the subscription plan of the given user.
   *
   * request url: /kapi/v1/subscription/user/{user}/plan
   * request method: POST
   *
   * @param user
   * @param {Object} args
   * @param {String} args.identifier 
   */
  async setSubscriptionPlan(user, args: ISetSubscriptionPlanArguments): Promise<any> {
    const route = { path: 'subscription/user/{user}/plan', method: 'POST', version: 1 }
    const argList = Object.assign({ user }, args)
    const requiredArguments = ['identifier']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Get current quota for the company.
   *
   * request url: /kapi/v1/subscription/company/{company}/quota
   * request method: GET
   *
   * @param company
   * @param {Object} args
   */
  async getQuota(company): Promise<any> {
    const route = { path: 'subscription/company/{company}/quota', method: 'GET', version: 1 }
    const argList = Object.assign({ company }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Get a list of subscription products.
   * request url: /kapi/v1/subscription/products
   * request method: GET
   *
   * @param {Object} args
   */
  async getSubscriptionProducts(): Promise<any> {
    const route = { path: 'subscription/products', method: 'GET', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Create a checkout session for current user.
   *
   * request url: /kapi/v1/subscription/checkout/session
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.price_id The product price id
   * @param {String} args.success_url 
   * @param {String} args.cancel_url 
   */
  async createCheckoutSession(args: ICreateCheckoutSessionArguments): Promise<any> {
    const route = { path: 'subscription/checkout/session', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['price_id', 'success_url', 'cancel_url']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Create a customer portal session for current user.
   *
   * request url: /kapi/v1/subscription/portal/session
   * request method: POST
   *
   * @param {Object} args
   * @param {String} args.return_url 
   */
  async createCustomerPortalSession(args: ICreateCustomerPortalSessionArguments): Promise<any> {
    const route = { path: 'subscription/portal/session', method: 'POST', version: 1 }
    const argList = Object.assign({  }, args)
    const requiredArguments = ['return_url']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * Cancel a subscription.
   *
   * request url: /kapi/v1/subscription/external/{subscriptionId}
   * request method: DELETE
   *
   * @param subscriptionId
   * @param {Object} args
   */
  async cancelSubscription(subscriptionId): Promise<any> {
    const route = { path: 'subscription/external/{subscriptionId}', method: 'DELETE', version: 1 }
    const argList = Object.assign({ subscriptionId }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Get a list of subscriptions for current user.
   * request url: /kapi/v1/subscription
   * request method: GET
   *
   * @param {Object} args
   */
  async getUserSubscriptions(): Promise<any> {
    const route = { path: 'subscription', method: 'GET', version: 1 }
    const argList = Object.assign({  }, {})

    return this.connection.send(route, argList)
  }

  /**
   * Update subscription by project.
   *
   * request url: /kapi/v1/subscription/project/{project}
   * request method: POST
   *
   * @param project
   * @param {Object} args
   * @param {String} args.price_id The product price id
   * @param {String} args.success_url 
   * @param {String} args.cancel_url 
   */
  async updateSubscriptionByProject(project, args: IUpdateSubscriptionByProjectArguments): Promise<any> {
    const route = { path: 'subscription/project/{project}', method: 'POST', version: 1 }
    const argList = Object.assign({ project }, args)
    const requiredArguments = ['price_id', 'success_url', 'cancel_url']
    this._assertValidArguments(requiredArguments, argList)

    return this.connection.send(route, argList)
  }

  /**
   * End all trials.
   *
   * request url: /kapi/v1/subscription/trial/{providerIdentifier}/end
   * request method: POST
   *
   * @param providerIdentifier
   * @param {Object} args
   */
  async endTrials(providerIdentifier): Promise<any> {
    const route = { path: 'subscription/trial/{providerIdentifier}/end', method: 'POST', version: 1 }
    const argList = Object.assign({ providerIdentifier }, {})

    return this.connection.send(route, argList)
  }

}

export default SubscriptionRepository
