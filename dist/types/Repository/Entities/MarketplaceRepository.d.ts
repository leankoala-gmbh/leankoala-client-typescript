import Repository from '../Repository';
export interface ISetComponentArguments {
    url: string;
}
export interface IGetHealthStatusArguments {
    from?: string;
    time?: string;
}
export interface IActivateFeatureArguments {
    projects: any[];
}
export interface IDeactivateFeatureArguments {
    projects: any[];
}
export interface IGetAvailableFeaturesArguments {
    status?: number;
}
declare class MarketplaceRepository extends Repository {
    constructor();
    getActiveProjectFeatures(project: any): Promise<any>;
    getActiveProviderFeatures(providerIdentifier: any): Promise<any>;
    getComponents(system: any, featureIdentifier: any): Promise<any>;
    setComponent(system: any, suggestionIdentifier: any, args: ISetComponentArguments): Promise<any>;
    getHealthStatus(system: any, featureIdentifier: any, args: IGetHealthStatusArguments): Promise<any>;
    getFeatures(providerIdentifier: any, company: any): Promise<any>;
    activateFeature(company: any, featureIdentifier: any, args: IActivateFeatureArguments): Promise<any>;
    deactivateFeature(company: any, featureIdentifier: any, args: IDeactivateFeatureArguments): Promise<any>;
    getActiveFeatures(project: any): Promise<any>;
    getAvailableFeatures(project: any, args: IGetAvailableFeaturesArguments): Promise<any>;
    getAllFeatures(): Promise<any>;
    getFavourites(): Promise<any>;
    getBookingLog(company: any): Promise<any>;
    getSystemPluginStatus(system: any): Promise<any>;
    getUserPluginStatus(user: any): Promise<any>;
    restProxy(secret: any, url: any): Promise<any>;
}
export default MarketplaceRepository;
