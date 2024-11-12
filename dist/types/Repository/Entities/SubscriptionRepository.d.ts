import Repository from '../Repository';
export interface ISetCompanyCreditCardPlansArguments {
    quantity: number;
    system_size?: number;
}
export interface ISetCompanyFreePlansArguments {
    quantity: number;
    system_size: number;
}
export interface ISetCompanyFreePlansByUserArguments {
    quantity: number;
    system_size?: number;
    identifier?: string;
}
export interface ISetCreditCardArguments {
    stripe_cc_source: any;
    last_digits: string;
    brand: string;
}
export interface ISetBillingAddressArguments {
    company_name: string;
    country: string;
    postal_code: string;
    city: string;
    street: string;
    usident?: string;
    email?: string;
}
export interface ISetSubscriptionPlanArguments {
    identifier: string;
}
export interface ICreateCheckoutSessionArguments {
    price_id: string;
    success_url: string;
    cancel_url: string;
    two_factor_code?: string;
}
export interface ICreateCustomerPortalSessionArguments {
    return_url: string;
}
export interface IUpdateSubscriptionByProjectArguments {
    price_id: string;
    success_url: string;
    cancel_url: string;
    two_factor_code?: string;
}
declare class SubscriptionRepository extends Repository {
    constructor();
    getCompanySubscription(company: any): Promise<any>;
    setCompanyCreditCardPlans(company: any, args: ISetCompanyCreditCardPlansArguments): Promise<any>;
    setCompanyFreePlans(company: any, args: ISetCompanyFreePlansArguments): Promise<any>;
    setCompanyFreePlansByUser(user: any, args: ISetCompanyFreePlansByUserArguments): Promise<any>;
    setCreditCard(company: any, args: ISetCreditCardArguments): Promise<any>;
    setBillingAddress(company: any, args: ISetBillingAddressArguments): Promise<any>;
    getBillingAddress(company: any): Promise<any>;
    getSubscribedFeatures(company: any): Promise<any>;
    getCompanyInvoices(company: any): Promise<any>;
    setSubscriptionPlan(user: any, args: ISetSubscriptionPlanArguments): Promise<any>;
    getQuota(company: any): Promise<any>;
    getSubscriptionProducts(): Promise<any>;
    createCheckoutSession(args: ICreateCheckoutSessionArguments): Promise<any>;
    createCustomerPortalSession(args: ICreateCustomerPortalSessionArguments): Promise<any>;
    cancelSubscription(subscriptionId: any): Promise<any>;
    getUserSubscriptions(): Promise<any>;
    updateSubscriptionByProject(project: any, args: IUpdateSubscriptionByProjectArguments): Promise<any>;
    endTrials(providerIdentifier: any): Promise<any>;
}
export default SubscriptionRepository;
