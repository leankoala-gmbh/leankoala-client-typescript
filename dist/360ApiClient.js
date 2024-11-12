var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/360ApiClient.ts
var ApiClient_exports = {};
__export(ApiClient_exports, {
  BadRequestError: () => BadRequestError_default,
  LeankoalaClient: () => LeankoalaClient,
  MarketPlaceConsts: () => Marketplace_default,
  RefreshTokenInvalidError: () => RefreshTokenInvalidError_default,
  SessionConnector: () => SessionConnector_default
});
module.exports = __toCommonJS(ApiClient_exports);
var import_axios2 = __toESM(require("axios"));

// src/Connection/Connection.ts
var import_jwt_decode = __toESM(require("jwt-decode"));

// src/Connection/BadRequestError.ts
var BadRequestError = class extends Error {
  constructor(errorData) {
    super(errorData.message);
    this.url = errorData.url;
    this.data = errorData.data;
    if (errorData.identifier) {
      this.identifier = errorData.identifier;
    }
  }
};
var BadRequestError_default = BadRequestError;

// src/Connection/ForbiddenError.ts
var ForbiddenError = class extends Error {
};
var ForbiddenError_default = ForbiddenError;

// src/Connection/RefreshTokenInvalidError.ts
var RefreshTokenInvalidError = class extends Error {
};
var RefreshTokenInvalidError_default = RefreshTokenInvalidError;

// src/Connection/Connection.ts
var Connection = class {
  constructor(apiServer, axios3, provider, headerMeta) {
    this._user = {};
    this._defaultParameters = {};
    this._refreshRoute = {
      version: 1,
      path: "auth/tokens/refresh/{user_id}",
      method: "POST"
    };
    this._accessToken = "";
    this._refreshToken = "";
    this._user = {};
    this._accessExpireTimestamp = 0;
    this._refreshExpireTimestamp = 0;
    this._apiServer = apiServer;
    this._preferredLanguage = "en";
    this._axios = axios3;
    this._axiosAdapter = false;
    this._defaultParameters = {};
    this._registeredEventListeners = {};
    this._provider = provider;
    this._routes = {
      authenticateByPassword: {
        version: 1,
        path: "auth/tokens/access",
        method: "POST"
      },
      authenticateByToken: {
        version: 1,
        path: "auth/tokens/token/{masterUserId}",
        method: "POST"
      }
    };
    this._headerMeta = headerMeta;
  }
  connect(args) {
    return __async(this, null, function* () {
      const defaultArgs = {};
      this._connectionArgs = Object.assign(defaultArgs, args);
      if (args.language) {
        this.setLanguage(args.language);
      }
      if (args.axiosAdapter) {
        this._axiosAdapter = args.axiosAdapter;
      }
      if (args.refreshToken) {
        if (!args.userId) {
          throw new Error("When connecting via refresh token the userId is also mandatory.");
        }
        this._user = { id: args.userId };
        this._refreshToken = args.refreshToken;
        this._accessExpireTimestamp = 0;
        yield this.refreshAccessToken(true, args.withMemories);
      } else if (args.accessToken) {
        this.setAccessToken(args.accessToken, args.refreshToken);
        this._accessExpireTimestamp = Date.now() / 1e3 + 60;
      } else if (args.wakeUpToken) {
        yield this._connectByWakeUpToken(args);
      } else {
        let withMemories = false;
        if (!this._connectionArgs.loginToken) {
          if (!this._connectionArgs.username) {
            throw new Error("Mandatory username is missing");
          }
          if (!this._connectionArgs.password) {
            throw new Error("Mandatory password is missing");
          }
        }
        if (this._connectionArgs.withMemories) {
          withMemories = this._connectionArgs.withMemories;
        }
        yield this._authenticate({
          username: args.username,
          password: args.password,
          withMemories,
          loginToken: args.loginToken
        });
      }
    });
  }
  _connectByWakeUpToken(args) {
    return __async(this, null, function* () {
      if (!args.wakeUpToken)
        return;
      const wakeUpToken = JSON.parse(args.wakeUpToken);
      this._refreshToken = wakeUpToken.refreshToken;
      this._user = wakeUpToken.user;
      this._refreshExpireTimestamp = wakeUpToken.expireDate;
      this._accessExpireTimestamp = 0;
      this.setLanguage(args.preferred_language);
      yield this.refreshAccessToken(true, args.withMemories);
    });
  }
  getAccessToken() {
    return this._accessToken;
  }
  getExpireDate() {
    return this._refreshExpireTimestamp;
  }
  getWakeUpToken() {
    return {
      refreshToken: this._refreshToken,
      user: this.getUser(),
      expireDate: this.getExpireDate(),
      apiServer: this._apiServer
    };
  }
  getUser() {
    return this._user;
  }
  _getUrl(route, args) {
    const plainPath = route.path;
    const version = route.version;
    const apiServer = this._apiServer;
    if (!apiServer) {
      throw new Error("Unable to create the url. ApiServer parameter is missing.");
    }
    let url = `${apiServer}v${version}/${plainPath}`;
    const matches = url.match(/{(.*?)}/gi);
    if (matches !== null) {
      matches.forEach(function(match) {
        const varName = match.replace("{", "").replace("}", "");
        if (args[varName]) {
          url = url.replace(match, args[varName]);
        } else {
          throw new Error("The mandatory parameter " + varName + " is missing in the arguments object.");
        }
      });
    }
    return url.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
  }
  send(route, data, withoutToken = false) {
    return __async(this, null, function* () {
      const headers = {
        "accept-language": this._preferredLanguage
      };
      Object.entries(this._headerMeta).forEach(([key, value]) => {
        headers[key] = String(value);
      });
      if (!withoutToken) {
        yield this.refreshAccessToken();
        headers.Authorization = `Bearer ${this._accessToken}`;
      }
      const defaultParameters = Object.assign({}, this._defaultParameters);
      const fullData = __spreadValues(__spreadValues({}, defaultParameters), data);
      const method = route.method.toUpperCase();
      const url = this._getUrl(route, fullData);
      let response;
      try {
        const parameters = { method, url, data: fullData, headers, adapter: this._axiosAdapter };
        this._publish("send", parameters);
        response = yield this._axios(parameters);
      } catch (err) {
        if (err.response) {
          response = err.response;
        } else {
          this._publish("error", err);
          throw err;
        }
      }
      this._publish("response", response);
      this._assertValidResponse(response, url, data);
      return response.data.data;
    });
  }
  setLanguage(language) {
    this._preferredLanguage = language;
  }
  addDefaultParameter(key, value) {
    this._defaultParameters[key] = value;
  }
  _assertValidResponse(response, url, data) {
    const responseData = response.data;
    if (responseData.status !== "success") {
      const payload = { message: responseData.message, url, data };
      if (responseData.identifier) {
        payload.identifier = responseData.identifier;
      }
      this._publish("failure", payload);
      if (response.status === 403) {
        throw new ForbiddenError_default(responseData.message);
      } else {
        throw new BadRequestError_default(payload);
      }
    }
  }
  _authenticate(args) {
    return __async(this, null, function* () {
      let tokens;
      if (args.username) {
        tokens = yield this.send(this._routes.authenticateByPassword, {
          username: args.username,
          password: args.password,
          with_memories: args.withMemories,
          withMemories: args.withMemories
        }, true);
      } else if (args.loginToken) {
        tokens = yield this.send(this._routes.authenticateByToken, {
          access_token: args.loginToken,
          with_memories: args.withMemories,
          withMemories: args.withMemories
        }, true);
      } else {
        throw new Error("User name or login token is not set. At least one of them must be set..");
      }
      this.setAccessToken(tokens.token, tokens.refresh_token);
      this._user = tokens.user;
      this._user.memories = tokens.memories;
      this._refreshTokenExpireDate(true);
    });
  }
  _refreshTokenExpireDate(withRefreshToken = false) {
    const accessTokenData = (0, import_jwt_decode.default)(this._accessToken);
    this._accessExpireTimestamp = Math.floor(Date.now() / 1e3) + accessTokenData.ttl;
    if (withRefreshToken) {
      const refreshTokenData = (0, import_jwt_decode.default)(this._refreshToken);
      this._refreshExpireTimestamp = Math.floor(Date.now() / 1e3) + refreshTokenData.ttl;
    }
  }
  setAccessToken(token, refreshToken) {
    this._accessToken = token;
    let withRefreshToken = false;
    if (refreshToken) {
      this._refreshToken = refreshToken;
      withRefreshToken = true;
    }
    this.addDefaultParameter("access_token", token);
    this._refreshTokenExpireDate(withRefreshToken);
  }
  refreshAccessToken(forceRefresh = false, withMemories = false) {
    return __async(this, null, function* () {
      if (forceRefresh || Math.floor(Date.now() / 1e3) + 10 > this._accessExpireTimestamp) {
        const user = this.getUser();
        let tokens = {};
        try {
          tokens = yield this.send(this._refreshRoute, {
            user_id: user.id,
            user: user.id,
            access_token: this._refreshToken,
            with_memories: withMemories,
            withMemories,
            application: this._provider
          }, true);
          if (tokens.user) {
            this._user = tokens.user;
          }
        } catch (error) {
          this._publish("refresh.invalid", { message: error.message });
          throw new RefreshTokenInvalidError_default(error.message);
        }
        if (tokens.memories) {
          this._user.memories = tokens.memories;
        }
        this.setAccessToken(tokens.token, this._refreshToken);
      }
    });
  }
  setUser(user) {
    this._user = user;
  }
  setRefreshRoute(route) {
    this._refreshRoute = route;
  }
  on(eventName, callback) {
    if (!(eventName in this._registeredEventListeners)) {
      this._registeredEventListeners[eventName] = [];
    }
    this._registeredEventListeners[eventName].push(callback);
  }
  _publish(eventName, payload) {
    if (eventName in this._registeredEventListeners) {
      this._registeredEventListeners[eventName].forEach((element) => {
        element(payload);
      });
    }
  }
};
var Connection_default = Connection;

// src/Repository/Repository.ts
var Repository = class {
  constructor() {
    this.connectionType = "MasterConnection";
  }
  _assertValidArguments(requiredArguments, actualArguments) {
    requiredArguments.forEach(function(argument) {
      if (!(argument in actualArguments)) {
        throw new Error(`The mandatory argument ${argument} could not be found in the argument object.`);
      }
    });
  }
  setConnection(connection) {
    this.connection = connection;
  }
  getConnectionType() {
    return this.connectionType;
  }
};

// src/Repository/Entities/SequenceRepository.ts
var SequenceRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getCommands(project) {
    return __async(this, null, function* () {
      const route = { path: "sequences/{project}/commands", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  getSequences(project) {
    return __async(this, null, function* () {
      const route = { path: "sequences/{project}/sequences", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  createSequence(project, args) {
    return __async(this, null, function* () {
      const route = { path: "sequences/{project}/sequence", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["name", "startUrl"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  updateSequence(project, args) {
    return __async(this, null, function* () {
      const route = { path: "sequences/{project}/sequence", method: "PUT", version: 1 };
      const argList = Object.assign({ project }, args);
      return this.connection.send(route, argList);
    });
  }
  activateSequence(sequence) {
    return __async(this, null, function* () {
      const route = { path: "sequences/{sequence}/activate", method: "PUT", version: 1 };
      const argList = Object.assign({ sequence }, {});
      return this.connection.send(route, argList);
    });
  }
  deactivateSequence(sequence) {
    return __async(this, null, function* () {
      const route = { path: "sequences/{sequence}/deactivate", method: "PUT", version: 1 };
      const argList = Object.assign({ sequence }, {});
      return this.connection.send(route, argList);
    });
  }
  getRecentRuns(sequence) {
    return __async(this, null, function* () {
      const route = { path: "sequences/{sequence}/recent", method: "GET", version: 1 };
      const argList = Object.assign({ sequence }, {});
      return this.connection.send(route, argList);
    });
  }
};
var SequenceRepository_default = SequenceRepository;

// src/Repository/Entities/MarketplaceRepository.ts
var MarketplaceRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getActiveProjectFeatures(project) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/features/project/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  getActiveProviderFeatures(providerIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/features/provider/{providerIdentifier}", method: "GET", version: 1 };
      const argList = Object.assign({ providerIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
  getComponents(system, featureIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/features/components/{system}/{featureIdentifier}", method: "GET", version: 1 };
      const argList = Object.assign({ system, featureIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
  setComponent(system, suggestionIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/features/components/{system}/{suggestionIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ system, suggestionIdentifier }, args);
      const requiredArguments = ["url"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  getHealthStatus(system, featureIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/features/status/{system}/{featureIdentifier}", method: "GET", version: 1 };
      const argList = Object.assign({ system, featureIdentifier }, args);
      return this.connection.send(route, argList);
    });
  }
  getFeatures(providerIdentifier, company) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/marketplace/features/{providerIdentifier}/{company}", method: "GET", version: 1 };
      const argList = Object.assign({ providerIdentifier, company }, {});
      return this.connection.send(route, argList);
    });
  }
  activateFeature(company, featureIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/marketplace/feature/activate/{company}/{featureIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ company, featureIdentifier }, args);
      const requiredArguments = ["projects"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  deactivateFeature(company, featureIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/marketplace/feature/deactivate/{company}/{featureIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ company, featureIdentifier }, args);
      const requiredArguments = ["projects"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  getActiveFeatures(project) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/marketplace/feature/active/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  getAvailableFeatures(project, args) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/marketplace/feature/available/{project}", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      return this.connection.send(route, argList);
    });
  }
  getAllFeatures() {
    return __async(this, null, function* () {
      const route = { path: "marketplace/marketplace/feature/all", method: "POST", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
  getFavourites() {
    return __async(this, null, function* () {
      const route = { path: "marketplace/marketplace/favourites", method: "GET", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
  getBookingLog(company) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/log/company/{company}", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  getSystemPluginStatus(system) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/plugins/incidents/system/{system}", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  getUserPluginStatus(user) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/plugins/incidents/user/{user}", method: "GET", version: 1 };
      const argList = Object.assign({ user }, {});
      return this.connection.send(route, argList);
    });
  }
  restProxy(secret, url) {
    return __async(this, null, function* () {
      const route = { path: "marketplace/proxy/{secret}/{url}", method: "GET", version: 1 };
      const argList = Object.assign({ secret, url }, {});
      return this.connection.send(route, argList);
    });
  }
};
var MarketplaceRepository_default = MarketplaceRepository;

// src/Repository/Entities/SubscriptionRepository.ts
var SubscriptionRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getCompanySubscription(company) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  setCompanyCreditCardPlans(company, args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/plans/creditcard", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["quantity"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  setCompanyFreePlans(company, args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/plans/free", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["quantity", "system_size"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  setCompanyFreePlansByUser(user, args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/user/{user}/plans/free", method: "POST", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["quantity"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  setCreditCard(company, args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/creditcard", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["stripe_cc_source", "last_digits", "brand"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  setBillingAddress(company, args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/billingaddress", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["company_name", "country", "postal_code", "city", "street"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  getBillingAddress(company) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/billingaddress", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  getSubscribedFeatures(company) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/features", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  getCompanyInvoices(company) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/invoices", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  setSubscriptionPlan(user, args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/user/{user}/plan", method: "POST", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["identifier"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  getQuota(company) {
    return __async(this, null, function* () {
      const route = { path: "subscription/company/{company}/quota", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  getSubscriptionProducts() {
    return __async(this, null, function* () {
      const route = { path: "subscription/products", method: "GET", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
  createCheckoutSession(args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/checkout/session", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["price_id", "success_url", "cancel_url"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  createCustomerPortalSession(args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/portal/session", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["return_url"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  cancelSubscription(subscriptionId) {
    return __async(this, null, function* () {
      const route = { path: "subscription/external/{subscriptionId}", method: "DELETE", version: 1 };
      const argList = Object.assign({ subscriptionId }, {});
      return this.connection.send(route, argList);
    });
  }
  getUserSubscriptions() {
    return __async(this, null, function* () {
      const route = { path: "subscription", method: "GET", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
  updateSubscriptionByProject(project, args) {
    return __async(this, null, function* () {
      const route = { path: "subscription/project/{project}", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["price_id", "success_url", "cancel_url"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  endTrials(providerIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "subscription/trial/{providerIdentifier}/end", method: "POST", version: 1 };
      const argList = Object.assign({ providerIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
};
var SubscriptionRepository_default = SubscriptionRepository;

// src/Repository/Entities/CrawlerRepository.ts
var CrawlerRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getCrawlerSettings(company) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/company/{company}/settings", method: "POST", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  runCrawl(project, args) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/{project}", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["user", "name", "system"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  runCompanyCrawl(company, args) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/company/{company}", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["user", "name", "path"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  listCrawls(project, args) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/{project}/crawls", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["system"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  listCompanyCrawls(company, args) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/company/{company}/crawls", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      return this.connection.send(route, argList);
    });
  }
  abortCrawl(project, crawl) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/{project}/{crawl}", method: "PUT", version: 1 };
      const argList = Object.assign({ project, crawl }, {});
      return this.connection.send(route, argList);
    });
  }
  getCrawl(crawl) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/detail/{crawl}", method: "POST", version: 1 };
      const argList = Object.assign({ crawl }, {});
      return this.connection.send(route, argList);
    });
  }
  getCrawlCsv(crawl, downloadSecret) {
    return __async(this, null, function* () {
      const route = { path: "crawler/crawl/detail/csv/{crawl}/{downloadSecret}", method: "GET", version: 1 };
      const argList = Object.assign({ crawl, downloadSecret }, {});
      return this.connection.send(route, argList);
    });
  }
  getCrawlerStatus(project) {
    return __async(this, null, function* () {
      const route = { path: "crawler/status/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  getCompanyCrawlerStatus(company) {
    return __async(this, null, function* () {
      const route = { path: "crawler/status/company/{company}", method: "POST", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  getCrawlableCollections() {
    return __async(this, null, function* () {
      const route = { path: "crawler/collections", method: "POST", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
  setCheckStatus(company, args) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/check/status", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["check_type", "check_status", "url"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  deleteCheckStatus(company, crawlUrlStatus) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/check/status/{crawlUrlStatus}", method: "DELETE", version: 1 };
      const argList = Object.assign({ company, crawlUrlStatus }, {});
      return this.connection.send(route, argList);
    });
  }
  listCheckStatus(company) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/check/status", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  listCrawlSchedules(company) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/schedules", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  showCrawlSchedule(company, crawlSchedule) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/schedules/{crawlSchedule}", method: "GET", version: 1 };
      const argList = Object.assign({ company, crawlSchedule }, {});
      return this.connection.send(route, argList);
    });
  }
  createCrawlSchedule(company, args) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/schedules", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["path", "interval", "timeslot", "collections", "timezone"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  updateCrawlSchedule(company, crawlSchedule, args) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/schedules/{crawlSchedule}", method: "PATCH", version: 1 };
      const argList = Object.assign({ company, crawlSchedule }, args);
      return this.connection.send(route, argList);
    });
  }
  deleteCrawlSchedule(company, crawlSchedule) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/schedules/{crawlSchedule}", method: "DELETE", version: 1 };
      const argList = Object.assign({ company, crawlSchedule }, {});
      return this.connection.send(route, argList);
    });
  }
  runScheduledCrawl(company, crawlSchedule) {
    return __async(this, null, function* () {
      const route = { path: "crawler/company/{company}/schedules/{crawlSchedule}/crawl", method: "POST", version: 1 };
      const argList = Object.assign({ company, crawlSchedule }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CrawlerRepository_default = CrawlerRepository;

// src/Repository/Entities/CustomerHaendlerbundRepository.ts
var CustomerHaendlerbundRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  createShop(args) {
    return __async(this, null, function* () {
      const route = { path: "customers/haendlerbund/shops", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["name", "base_url", "owner"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  updateShop(system, args) {
    return __async(this, null, function* () {
      const route = { path: "customers/haendlerbund/shops/{system}", method: "PUT", version: 1 };
      const argList = Object.assign({ system }, args);
      return this.connection.send(route, argList);
    });
  }
};
var CustomerHaendlerbundRepository_default = CustomerHaendlerbundRepository;

// src/Repository/Entities/CustomerHaendlerbundMetricRepository.ts
var CustomerHaendlerbundMetricRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  findBySystem(system, args) {
    return __async(this, null, function* () {
      const route = { path: "customers/haendlerbund/metrics/{system}", method: "POST", version: 1 };
      const argList = Object.assign({ system }, args);
      return this.connection.send(route, argList);
    });
  }
};
var CustomerHaendlerbundMetricRepository_default = CustomerHaendlerbundMetricRepository;

// src/Repository/Entities/CustomerMehrwertsteuercheckRepository.ts
var CustomerMehrwertsteuercheckRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  runMwstCrawl(args) {
    return __async(this, null, function* () {
      const route = { path: "customers/mehrwertsteuer/crawl", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["email_address", "start_url"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  showCrawlResult(crawlIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "customers/mehrwertsteuer/crawl/{crawlIdentifier}", method: "GET", version: 1 };
      const argList = Object.assign({ crawlIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CustomerMehrwertsteuercheckRepository_default = CustomerMehrwertsteuercheckRepository;

// src/Repository/Entities/MemoryRepository.ts
var MemoryRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "MasterConnection";
  }
  set(application, objectType, objectId, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/memory/{objectType}/{objectId}", method: "PUT", version: 1 };
      const argList = Object.assign({ application, objectType, objectId }, args);
      const requiredArguments = ["key", "value"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var MemoryRepository_default = MemoryRepository;

// src/Repository/Entities/ScoreRepository.ts
var ScoreRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getScoresByUser(user, args) {
    return __async(this, null, function* () {
      const route = { path: "score/scores/user/{user}", method: "POST", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["scores"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  getScore(system, scoreName) {
    return __async(this, null, function* () {
      const route = { path: "score/scores/{system}/{scoreName}", method: "POST", version: 1 };
      const argList = Object.assign({ system, scoreName }, {});
      return this.connection.send(route, argList);
    });
  }
  getScores(system, args) {
    return __async(this, null, function* () {
      const route = { path: "score/scores/{system}", method: "POST", version: 1 };
      const argList = Object.assign({ system }, args);
      const requiredArguments = ["scores"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var ScoreRepository_default = ScoreRepository;

// src/Repository/Entities/AlertingPolicyRepository.ts
var AlertingPolicyRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  list(project) {
    return __async(this, null, function* () {
      const route = { path: "alerting/policies/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  create(project, args) {
    return __async(this, null, function* () {
      const route = { path: "alerting/policies/{project}", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["name"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  delete(project, policy) {
    return __async(this, null, function* () {
      const route = { path: "alerting/policies/{project}/{policy}", method: "DELETE", version: 1 };
      const argList = Object.assign({ project, policy }, {});
      return this.connection.send(route, argList);
    });
  }
  update(project, policy, args) {
    return __async(this, null, function* () {
      const route = { path: "alerting/policies/{project}/{policy}", method: "PUT", version: 1 };
      const argList = Object.assign({ project, policy }, args);
      return this.connection.send(route, argList);
    });
  }
};
var AlertingPolicyRepository_default = AlertingPolicyRepository;

// src/Repository/Entities/AlertingChannelRepository.ts
var AlertingChannelRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  list(project) {
    return __async(this, null, function* () {
      const route = { path: "alerting/channels/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  create(project, args) {
    return __async(this, null, function* () {
      const route = { path: "alerting/channels/{project}", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["name", "type", "options"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  delete(project, channel) {
    return __async(this, null, function* () {
      const route = { path: "alerting/channels/{project}/{channel}", method: "DELETE", version: 1 };
      const argList = Object.assign({ project, channel }, {});
      return this.connection.send(route, argList);
    });
  }
  update(project, channel, args) {
    return __async(this, null, function* () {
      const route = { path: "alerting/channels/{project}/{channel}", method: "PUT", version: 1 };
      const argList = Object.assign({ project, channel }, args);
      const requiredArguments = ["type"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var AlertingChannelRepository_default = AlertingChannelRepository;

// src/Repository/Entities/WebsocketRepository.ts
var WebsocketRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getRooms() {
    return __async(this, null, function* () {
      const route = { path: "websockets/rooms", method: "POST", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
  getAllRooms() {
    return __async(this, null, function* () {
      const route = { path: "websockets/rooms/all", method: "POST", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
};
var WebsocketRepository_default = WebsocketRepository;

// src/Repository/Entities/MetricRepository.ts
var MetricRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  findBySystem(system, args) {
    return __async(this, null, function* () {
      const route = { path: "metric/eventidentifier/{system}/search", method: "POST", version: 1 };
      const argList = Object.assign({ system }, args);
      return this.connection.send(route, argList);
    });
  }
};
var MetricRepository_default = MetricRepository;

// src/Repository/Entities/AuthRepository.ts
var AuthRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  createTokenByCredentials(args) {
    return __async(this, null, function* () {
      const route = { path: "auth/tokens/access", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["username", "password"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  createTokenByRefreshToken(user, args) {
    return __async(this, null, function* () {
      const route = { path: "auth/tokens/refresh/{user}", method: "POST", version: 1 };
      const argList = Object.assign({ user }, args);
      return this.connection.send(route, argList);
    });
  }
};
var AuthRepository_default = AuthRepository;

// src/Repository/Entities/ClusterUserRepository.ts
var ClusterUserRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  activate(args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/activate", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["activation_key"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  create(provider, args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/{provider}", method: "POST", version: 1 };
      const argList = Object.assign({ provider }, args);
      const requiredArguments = ["email", "password"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  updateUser(user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/{user}", method: "PUT", version: 1 };
      const argList = Object.assign({ user }, args);
      return this.connection.send(route, argList);
    });
  }
  setPreferredLanguage(user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/preferredLanguage/{user}", method: "PUT", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["language"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  delete(user) {
    return __async(this, null, function* () {
      const route = { path: "user/users/{user}", method: "DELETE", version: 1 };
      const argList = Object.assign({ user }, {});
      return this.connection.send(route, argList);
    });
  }
  isDeletable(user) {
    return __async(this, null, function* () {
      const route = { path: "user/users/deletable/{user}", method: "POST", version: 1 };
      const argList = Object.assign({ user }, {});
      return this.connection.send(route, argList);
    });
  }
  deleteByEmail(args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/delete/email", method: "DELETE", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["email"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  connectOAuthAccount(user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/oauth/{user}/connect", method: "PUT", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["provider", "provider_user_id"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  exists(args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/exists", method: "GET", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["query"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  find(args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/find", method: "GET", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["query"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  findAll(providerIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "user/users/find/all/{providerIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ providerIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
  updateMasterId(user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/{user}/masterId", method: "PUT", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["master_id"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  changePassword(user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/{user}/password", method: "PUT", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["password_new"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  requestPasswordReset(args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/password/reset/request", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["email"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  resetPassword(user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/users/password/reset/{user}", method: "PUT", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["password"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var ClusterUserRepository_default = ClusterUserRepository;

// src/Repository/Entities/UserRepository.ts
var UserRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "MasterConnection";
  }
  createUser(application, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user", method: "POST", version: 1 };
      const argList = Object.assign({ application }, args);
      const requiredArguments = ["email", "password"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  deleteUser(application, user) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/{user}", method: "DELETE", version: 1 };
      const argList = Object.assign({ application, user }, {});
      return this.connection.send(route, argList);
    });
  }
  updateUser(application, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/{user}", method: "PUT", version: 1 };
      const argList = Object.assign({ application, user }, args);
      return this.connection.send(route, argList);
    });
  }
  setPreferredLanguage(application, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/{user}/language", method: "PUT", version: 1 };
      const argList = Object.assign({ application, user }, args);
      const requiredArguments = ["language"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  changePassword(application, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/{user}/password", method: "PUT", version: 1 };
      const argList = Object.assign({ application, user }, args);
      const requiredArguments = ["password_old", "password_new"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  isDeletable(application, user, company) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/{user}/deletable/{company}", method: "POST", version: 1 };
      const argList = Object.assign({ application, user, company }, {});
      return this.connection.send(route, argList);
    });
  }
  resetPassword(application, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/{user}/password/reset", method: "PUT", version: 1 };
      const argList = Object.assign({ application, user }, args);
      const requiredArguments = ["password"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList, true);
    });
  }
  requestPasswordReset(application, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/password/request", method: "POST", version: 1 };
      const argList = Object.assign({ application }, args);
      const requiredArguments = ["email"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList, true);
    });
  }
  activate(application, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/activate", method: "POST", version: 1 };
      const argList = Object.assign({ application }, args);
      const requiredArguments = ["activation_key"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  find(application, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/find", method: "POST", version: 1 };
      const argList = Object.assign({ application }, args);
      const requiredArguments = ["query"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  connectAuthAccount(application, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/user/{user}/connect", method: "POST", version: 1 };
      const argList = Object.assign({ application, user }, args);
      const requiredArguments = ["provider", "providerUserId"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var UserRepository_default = UserRepository;

// src/Repository/Entities/UserSubscriptionRepository.ts
var UserSubscriptionRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  update(user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/subscriptions/{user}", method: "PUT", version: 1 };
      const argList = Object.assign({ user }, args);
      const requiredArguments = ["system_count"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var UserSubscriptionRepository_default = UserSubscriptionRepository;

// src/Repository/Entities/InvitationRepository.ts
var InvitationRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  invite(project, args) {
    return __async(this, null, function* () {
      const route = { path: "user/invitation/invite/{project}", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["email"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  abort(invitation) {
    return __async(this, null, function* () {
      const route = { path: "user/invitation/abort/{invitation}", method: "DELETE", version: 1 };
      const argList = Object.assign({ invitation }, {});
      return this.connection.send(route, argList);
    });
  }
  getOpenInvitations(project) {
    return __async(this, null, function* () {
      const route = { path: "user/invitation/open/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
};
var InvitationRepository_default = InvitationRepository;

// src/Repository/Entities/ClusterCompanyRepository.ts
var ClusterCompanyRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  create(providerIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "user/companies/{providerIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ providerIdentifier }, args);
      const requiredArguments = ["name", "master_id"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  exists(args) {
    return __async(this, null, function* () {
      const route = { path: "user/companies/exists", method: "GET", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["company_name"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  search(providerIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "user/companies/search/{providerIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ providerIdentifier }, args);
      const requiredArguments = ["company_name"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  findAll(providerIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "user/companies/findall/{providerIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ providerIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
  connectUser(company, user, args) {
    return __async(this, null, function* () {
      const route = { path: "user/companies/connect/{company}/{user}", method: "POST", version: 1 };
      const argList = Object.assign({ company, user }, args);
      return this.connection.send(route, argList);
    });
  }
  updateMasterId(company, args) {
    return __async(this, null, function* () {
      const route = { path: "user/companies/{company}/masterId", method: "PUT", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["master_id"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var ClusterCompanyRepository_default = ClusterCompanyRepository;

// src/Repository/Entities/ComponentRepository.ts
var ComponentRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  showComponentTypes(project) {
    return __async(this, null, function* () {
      const route = { path: "project/components/componenttypes/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  showComponents(component) {
    return __async(this, null, function* () {
      const route = { path: "project/components/{component}", method: "GET", version: 1 };
      const argList = Object.assign({ component }, {});
      return this.connection.send(route, argList);
    });
  }
  createComponent(args) {
    return __async(this, null, function* () {
      const route = { path: "project/components", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["system"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  createComponents(args) {
    return __async(this, null, function* () {
      const route = { path: "project/components/many", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["system", "components"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  updateComponent(component, args) {
    return __async(this, null, function* () {
      const route = { path: "project/components/{component}", method: "PUT", version: 1 };
      const argList = Object.assign({ component }, args);
      return this.connection.send(route, argList);
    });
  }
  deleteComponent(component) {
    return __async(this, null, function* () {
      const route = { path: "project/components/{component}", method: "DELETE", version: 1 };
      const argList = Object.assign({ component }, {});
      return this.connection.send(route, argList);
    });
  }
};
var ComponentRepository_default = ComponentRepository;

// src/Repository/Entities/ProjectRepository.ts
var ProjectRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getStatus(project) {
    return __async(this, null, function* () {
      const route = { path: "project/{project}/onboarding/status", method: "POST", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  search(args) {
    return __async(this, null, function* () {
      const route = { path: "project/projects/search", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["user"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  searchAll(providerIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "project/{providerIdentifier}/all", method: "GET", version: 1 };
      const argList = Object.assign({ providerIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
  delete(project, args) {
    return __async(this, null, function* () {
      const route = { path: "project/projects/{project}", method: "DELETE", version: 1 };
      const argList = Object.assign({ project }, args);
      return this.connection.send(route, argList);
    });
  }
  update(project, args) {
    return __async(this, null, function* () {
      const route = { path: "project/projects/{project}", method: "PUT", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["name"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  getUsers(project) {
    return __async(this, null, function* () {
      const route = { path: "project/users/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  removeUser(project, user) {
    return __async(this, null, function* () {
      const route = { path: "project/users/{project}/{user}", method: "DELETE", version: 1 };
      const argList = Object.assign({ project, user }, {});
      return this.connection.send(route, argList);
    });
  }
};
var ProjectRepository_default = ProjectRepository;

// src/Repository/Entities/SystemRepository.ts
var SystemRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  createSystem(args) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/system", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["name", "base_url", "owner", "system_type"];
      this._assertValidArguments(requiredArguments, argList);
      const result = yield this.connection.send(route, argList);
      yield this.connection.refreshAccessToken(true);
      return result;
    });
  }
  updateSystem(system, args) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/system/{system}", method: "PUT", version: 1 };
      const argList = Object.assign({ system }, args);
      return this.connection.send(route, argList);
    });
  }
  getComponents(system) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/{system}/components", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  getComponentSuggestions(system) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/{system}/suggestions", method: "POST", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  changeLastFullRun(system, status) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/{system}/lastFullRun/{status}", method: "POST", version: 1 };
      const argList = Object.assign({ system, status }, {});
      return this.connection.send(route, argList);
    });
  }
  getNextLastFullRun(system) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/{system}/nextFullRun", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  getSystemTypes(providerIdentifier, system_size) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/{providerIdentifier}/systemType", method: "POST", version: 1 };
      const argList = Object.assign({ providerIdentifier, system_size }, {});
      return this.connection.send(route, argList);
    });
  }
  getComponentLimit(system) {
    return __async(this, null, function* () {
      const route = { path: "project/systems/{system}/component/limit", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  triggerComponentFinder(project, system, user) {
    return __async(this, null, function* () {
      const route = { path: "project/{project}/componentfinder/{system}/{user}/trigger", method: "POST", version: 1 };
      const argList = Object.assign({ project, system, user }, {});
      return this.connection.send(route, argList);
    });
  }
};
var SystemRepository_default = SystemRepository;

// src/Repository/Entities/ScreenshotRepository.ts
var ScreenshotRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getScreenshot(system) {
    return __async(this, null, function* () {
      const route = { path: "project/screenshot/{system}", method: "POST", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  getSystemScreenshots(system) {
    return __async(this, null, function* () {
      const route = { path: "project/screenshots/{system}", method: "POST", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var ScreenshotRepository_default = ScreenshotRepository;

// src/Repository/Entities/ToolRepository.ts
var ToolRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getChangedConfiguration(args) {
    return __async(this, null, function* () {
      const route = { path: "check/tools/changed", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["newerThan"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  findByProject(project) {
    return __async(this, null, function* () {
      const route = { path: "check/tools/{project}", method: "POST", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
  getConfiguration(project, toolIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "check/tools/{project}/{toolIdentifier}", method: "GET", version: 1 };
      const argList = Object.assign({ project, toolIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
  overwrite(project, toolIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "check/tools/{project}/{toolIdentifier}", method: "PUT", version: 1 };
      const argList = Object.assign({ project, toolIdentifier }, args);
      return this.connection.send(route, argList);
    });
  }
};
var ToolRepository_default = ToolRepository;

// src/Repository/Entities/CheckRepository.ts
var CheckRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  addByChecklist(system, args) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/checklist", method: "POST", version: 1 };
      const argList = Object.assign({ system }, args);
      const requiredArguments = ["checklist"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  addByRecipe(args) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/cookbook", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["component", "cookbook"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  runChecksForSystem(system, toolIdentifier) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/run/{system}/{toolIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ system, toolIdentifier }, {});
      return this.connection.send(route, argList);
    });
  }
  showCollections(project, toolIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "check/collections/{project}/{toolIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ project, toolIdentifier }, args);
      return this.connection.send(route, argList);
    });
  }
  showActiveCollections(system, toolIdentifier, args) {
    return __async(this, null, function* () {
      const route = { path: "check/collections/system/active/{system}/{toolIdentifier}", method: "POST", version: 1 };
      const argList = Object.assign({ system, toolIdentifier }, args);
      return this.connection.send(route, argList);
    });
  }
  updateCollections(system, args) {
    return __async(this, null, function* () {
      const route = { path: "check/collections/system/{system}", method: "PUT", version: 1 };
      const argList = Object.assign({ system }, args);
      return this.connection.send(route, argList);
    });
  }
};
var CheckRepository_default = CheckRepository;

// src/Repository/Entities/CheckLighthouseRepository.ts
var CheckLighthouseRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system, category, args) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/lighthouse/results/{category}", method: "GET", version: 1 };
      const argList = Object.assign({ system, category }, args);
      return this.connection.send(route, argList);
    });
  }
};
var CheckLighthouseRepository_default = CheckLighthouseRepository;

// src/Repository/Entities/CheckA11yRepository.ts
var CheckA11yRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/a11y/results", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckA11yRepository_default = CheckA11yRepository;

// src/Repository/Entities/CheckBrokenResourceRepository.ts
var CheckBrokenResourceRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getBrokenResources(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/brokenresources", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckBrokenResourceRepository_default = CheckBrokenResourceRepository;

// src/Repository/Entities/CheckJavaScriptErrorsRepository.ts
var CheckJavaScriptErrorsRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/jserrors", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckJavaScriptErrorsRepository_default = CheckJavaScriptErrorsRepository;

// src/Repository/Entities/CheckFileSizeRepository.ts
var CheckFileSizeRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/performance/big", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  ignorePattern(system, args) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/siteinfo/ignore", method: "POST", version: 1 };
      const argList = Object.assign({ system }, args);
      const requiredArguments = ["patterns"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var CheckFileSizeRepository_default = CheckFileSizeRepository;

// src/Repository/Entities/CheckSitemapRepository.ts
var CheckSitemapRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/sitemap", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckSitemapRepository_default = CheckSitemapRepository;

// src/Repository/Entities/CheckMobileFriendlyRepository.ts
var CheckMobileFriendlyRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/mobilefriendly", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckMobileFriendlyRepository_default = CheckMobileFriendlyRepository;

// src/Repository/Entities/CheckCertificateRepository.ts
var CheckCertificateRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getExpirationResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/certificate", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckCertificateRepository_default = CheckCertificateRepository;

// src/Repository/Entities/CheckInsecureContentRepository.ts
var CheckInsecureContentRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getInsecureElements(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/insecure", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckInsecureContentRepository_default = CheckInsecureContentRepository;

// src/Repository/Entities/CheckCookieRepository.ts
var CheckCookieRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getDomains(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/cookies/domains", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckCookieRepository_default = CheckCookieRepository;

// src/Repository/Entities/CheckDeadLinksRepository.ts
var CheckDeadLinksRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/deadlinks", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  getBlockedPatterns() {
    return __async(this, null, function* () {
      const route = { path: "check/checks/deadlinks/blocked", method: "GET", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
  getResultsByCompany(company) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/company/{company}/deadlinks", method: "GET", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  getConfiguration(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/deadlinks/config", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
  ignorePattern(system, args) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/deadlinks/ignore", method: "POST", version: 1 };
      const argList = Object.assign({ system }, args);
      const requiredArguments = ["patterns"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  unignorePattern(system, args) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/deadlinks/unignore", method: "POST", version: 1 };
      const argList = Object.assign({ system }, args);
      const requiredArguments = ["pattern_id"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var CheckDeadLinksRepository_default = CheckDeadLinksRepository;

// src/Repository/Entities/CheckHealthCheckRepository.ts
var CheckHealthCheckRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  getResults(system) {
    return __async(this, null, function* () {
      const route = { path: "check/checks/{system}/healthchecks", method: "GET", version: 1 };
      const argList = Object.assign({ system }, {});
      return this.connection.send(route, argList);
    });
  }
};
var CheckHealthCheckRepository_default = CheckHealthCheckRepository;

// src/Repository/Entities/NixstatsRepository.ts
var NixstatsRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  createWebsiteMonitor(company, args) {
    return __async(this, null, function* () {
      const route = { path: "check/nixtstats/{company}/monitor/website", method: "POST", version: 1 };
      const argList = Object.assign({ company }, args);
      const requiredArguments = ["url"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var NixstatsRepository_default = NixstatsRepository;

// src/Repository/Entities/IncidentRepository.ts
var IncidentRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  findByCompany(company) {
    return __async(this, null, function* () {
      const route = { path: "incident/incidents/company/{company}/search", method: "POST", version: 1 };
      const argList = Object.assign({ company }, {});
      return this.connection.send(route, argList);
    });
  }
  search(_0) {
    return __async(this, arguments, function* (project, args = {}) {
      const route = { path: "incident/incidents/{project}/search", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      return this.connection.send(route, argList);
    });
  }
  since(project, args) {
    return __async(this, null, function* () {
      const route = { path: "incident/incidents/{project}/since", method: "POST", version: 1 };
      const argList = Object.assign({ project }, args);
      const requiredArguments = ["days"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  find(project, incident) {
    return __async(this, null, function* () {
      const route = { path: "incident/incidents/{project}/{incident}", method: "GET", version: 1 };
      const argList = Object.assign({ project, incident }, {});
      return this.connection.send(route, argList);
    });
  }
  getConfig(project) {
    return __async(this, null, function* () {
      const route = { path: "incident/tools/{project}", method: "GET", version: 1 };
      const argList = Object.assign({ project }, {});
      return this.connection.send(route, argList);
    });
  }
};
var IncidentRepository_default = IncidentRepository;

// src/Repository/Entities/ApplicationRepository.ts
var ApplicationRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "MasterConnection";
  }
  getConfigByCName(cName) {
    return __async(this, null, function* () {
      const route = { path: "/application/whitelabel/config/cname/{cName}", method: "GET", version: 1 };
      const argList = Object.assign({ cName }, {});
      return this.connection.send(route, argList);
    });
  }
  getPrimaryCluster(application) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/cluster/primary", method: "POST", version: 1 };
      const argList = Object.assign({ application }, {});
      return this.connection.send(route, argList);
    });
  }
};
var ApplicationRepository_default = ApplicationRepository;

// src/Repository/Entities/LocationRepository.ts
var LocationRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  list() {
    return __async(this, null, function* () {
      const route = { path: "project/location/list", method: "GET", version: 1 };
      const argList = Object.assign({}, {});
      return this.connection.send(route, argList);
    });
  }
};
var LocationRepository_default = LocationRepository;

// src/Repository/Entities/CompanyRepository.ts
var CompanyRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "MasterConnection";
  }
  disconnectUser(application, company, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/company/{company}/disconnect/{user}", method: "PUT", version: 1 };
      const argList = Object.assign({ application, company, user }, args);
      return this.connection.send(route, argList);
    });
  }
  setCluster(application, company, args) {
    return __async(this, null, function* () {
      const route = { path: "/api/{application}/company/{company}", method: "POST", version: 1 };
      const argList = Object.assign({ application, company }, args);
      const requiredArguments = ["cluster"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var CompanyRepository_default = CompanyRepository;

// src/Repository/Entities/Auth2Repository.ts
var Auth2Repository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "MasterConnection";
  }
  loginWithCredentials(application, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/auth/login", method: "POST", version: 1 };
      const argList = Object.assign({ application }, args);
      const requiredArguments = ["emailOrUserName", "password"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  createTokenBySession(application, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/auth/session", method: "POST", version: 1 };
      const argList = Object.assign({ application }, args);
      return this.connection.send(route, argList);
    });
  }
  createTokenByRefreshToken(application, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/auth/refresh/{user}", method: "POST", version: 1 };
      const argList = Object.assign({ application, user }, args);
      return this.connection.send(route, argList);
    });
  }
  createToken(application, user, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/auth/token/{user}", method: "POST", version: 1 };
      const argList = Object.assign({ application, user }, args);
      return this.connection.send(route, argList);
    });
  }
  createReadOnlyRefreshToken(application, user) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/auth/read-only-token/{user}", method: "POST", version: 1 };
      const argList = Object.assign({ application, user }, {});
      return this.connection.send(route, argList);
    });
  }
  createTokenByConfirmCodeAndDeprecatedJwt(application, args) {
    return __async(this, null, function* () {
      const route = { path: "/{application}/auth/session-deprecated/confirm", method: "POST", version: 1 };
      const argList = Object.assign({ application }, args);
      const requiredArguments = ["deprecatedSessionToken", "confirmationCode"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var Auth2Repository_default = Auth2Repository;

// src/Repository/Entities/TwoFactorRepository.ts
var TwoFactorRepository = class extends Repository {
  constructor() {
    super();
    this.connectionType = "ClusterConnection";
  }
  isTwoFactorRequired(args) {
    return __async(this, null, function* () {
      const route = { path: "auth/2fa/is-required", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["action"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
  triggerTwoFactorForAction(args) {
    return __async(this, null, function* () {
      const route = { path: "auth/2fa/trigger", method: "POST", version: 1 };
      const argList = Object.assign({}, args);
      const requiredArguments = ["action"];
      this._assertValidArguments(requiredArguments, argList);
      return this.connection.send(route, argList);
    });
  }
};
var TwoFactorRepository_default = TwoFactorRepository;

// src/Repository/RepositoryCollection.ts
var RepositoryCollection = class {
  constructor() {
    this.masterConnection = false;
    this.clusterConnection = false;
    this.repositories = {};
    this.repositories.sequence = new SequenceRepository_default();
    this.repositories.auth2 = new Auth2Repository_default();
    this.repositories.marketplace = new MarketplaceRepository_default();
    this.repositories.subscription = new SubscriptionRepository_default();
    this.repositories.crawler = new CrawlerRepository_default();
    this.repositories.customerhaendlerbund = new CustomerHaendlerbundRepository_default();
    this.repositories.customerhaendlerbundmetric = new CustomerHaendlerbundMetricRepository_default();
    this.repositories.customermehrwertsteuercheck = new CustomerMehrwertsteuercheckRepository_default();
    this.repositories.memory = new MemoryRepository_default();
    this.repositories.score = new ScoreRepository_default();
    this.repositories.alertingpolicy = new AlertingPolicyRepository_default();
    this.repositories.alertingchannel = new AlertingChannelRepository_default();
    this.repositories.websocket = new WebsocketRepository_default();
    this.repositories.metric = new MetricRepository_default();
    this.repositories.auth = new AuthRepository_default();
    this.repositories.clusteruser = new ClusterUserRepository_default();
    this.repositories.user = new UserRepository_default();
    this.repositories.userSubscription = new UserSubscriptionRepository_default();
    this.repositories.invitation = new InvitationRepository_default();
    this.repositories.clustercompany = new ClusterCompanyRepository_default();
    this.repositories.component = new ComponentRepository_default();
    this.repositories.project = new ProjectRepository_default();
    this.repositories.system = new SystemRepository_default();
    this.repositories.screenshot = new ScreenshotRepository_default();
    this.repositories.tool = new ToolRepository_default();
    this.repositories.check = new CheckRepository_default();
    this.repositories.checklighthouse = new CheckLighthouseRepository_default();
    this.repositories.checka11y = new CheckA11yRepository_default();
    this.repositories.checkbrokenresource = new CheckBrokenResourceRepository_default();
    this.repositories.checkjavascripterrors = new CheckJavaScriptErrorsRepository_default();
    this.repositories.checkfilesize = new CheckFileSizeRepository_default();
    this.repositories.checksitemap = new CheckSitemapRepository_default();
    this.repositories.checkmobilefriendly = new CheckMobileFriendlyRepository_default();
    this.repositories.checkcertificate = new CheckCertificateRepository_default();
    this.repositories.checkinsecurecontent = new CheckInsecureContentRepository_default();
    this.repositories.checkcookie = new CheckCookieRepository_default();
    this.repositories.checkdeadlinks = new CheckDeadLinksRepository_default();
    this.repositories.checkhealthcheck = new CheckHealthCheckRepository_default();
    this.repositories.nixstats = new NixstatsRepository_default();
    this.repositories.incident = new IncidentRepository_default();
    this.repositories.application = new ApplicationRepository_default();
    this.repositories.location = new LocationRepository_default();
    this.repositories.company = new CompanyRepository_default();
    this.repositories.twofactor = new TwoFactorRepository_default();
  }
  setClusterConnection(connection) {
    this.clusterConnection = connection;
  }
  setMasterConnection(connection) {
    this.masterConnection = connection;
  }
  getRepository(entityType) {
    const repositoryName = entityType.toLowerCase();
    if (repositoryName in this.repositories) {
      const repo = this.repositories[repositoryName];
      if (repo.getConnectionType() === "ClusterConnection") {
        repo.setConnection(this.clusterConnection);
      } else {
        repo.setConnection(this.masterConnection);
      }
      return this.repositories[repositoryName];
    }
    throw new Error("No repository with name " + repositoryName + " found. Registered repositories are: " + JSON.stringify(Object.keys(this.repositories)));
  }
  getAuth2Repository() {
    return this.getRepository("Auth2");
  }
  getSequenceRepository() {
    return this.getRepository("Sequence");
  }
  getMarketplaceRepository() {
    return this.getRepository("Marketplace");
  }
  getSubscriptionRepository() {
    return this.getRepository("Subscription");
  }
  getCrawlerRepository() {
    return this.getRepository("Crawler");
  }
  getCustomerHaendlerbundRepository() {
    return this.getRepository("CustomerHaendlerbund");
  }
  getCustomerHaendlerbundMetricRepository() {
    return this.getRepository("CustomerHaendlerbundMetric");
  }
  getCustomerMehrwertsteuercheckRepository() {
    return this.getRepository("CustomerMehrwertsteuercheck");
  }
  getMemoryRepository() {
    return this.getRepository("Memory");
  }
  getScoreRepository() {
    return this.getRepository("Score");
  }
  getAlertingPolicyRepository() {
    return this.getRepository("AlertingPolicy");
  }
  getAlertingChannelRepository() {
    return this.getRepository("AlertingChannel");
  }
  getWebsocketRepository() {
    return this.getRepository("Websocket");
  }
  getMetricRepository() {
    return this.getRepository("Metric");
  }
  getAuthRepository() {
    return this.getRepository("Auth");
  }
  getClusterUserRepository() {
    return this.getRepository("ClusterUser");
  }
  getUserRepository() {
    return this.getRepository("User");
  }
  getUserSubscriptionRepository() {
    return this.getRepository("UserSubscription");
  }
  getInvitationRepository() {
    return this.getRepository("Invitation");
  }
  getClusterCompanyRepository() {
    return this.getRepository("ClusterCompany");
  }
  getComponentRepository() {
    return this.getRepository("Component");
  }
  getProjectRepository() {
    return this.getRepository("Project");
  }
  getSystemRepository() {
    return this.getRepository("System");
  }
  getScreenshotRepository() {
    return this.getRepository("Screenshot");
  }
  getToolRepository() {
    return this.getRepository("Tool");
  }
  getCheckRepository() {
    return this.getRepository("Check");
  }
  getCheckLighthouseRepository() {
    return this.getRepository("CheckLighthouse");
  }
  getCheckA11yRepository() {
    return this.getRepository("CheckA11y");
  }
  getCheckBrokenResourceRepository() {
    return this.getRepository("CheckBrokenResource");
  }
  getCheckJavaScriptErrorsRepository() {
    return this.getRepository("CheckJavaScriptErrors");
  }
  getCheckFileSizeRepository() {
    return this.getRepository("CheckFileSize");
  }
  getCheckSitemapRepository() {
    return this.getRepository("CheckSitemap");
  }
  getCheckMobileFriendlyRepository() {
    return this.getRepository("CheckMobileFriendly");
  }
  getCheckCertificateRepository() {
    return this.getRepository("CheckCertificate");
  }
  getCheckInsecureContentRepository() {
    return this.getRepository("CheckInsecureContent");
  }
  getCheckCookieRepository() {
    return this.getRepository("CheckCookie");
  }
  getCheckDeadLinksRepository() {
    return this.getRepository("CheckDeadLinks");
  }
  getCheckHealthCheckRepository() {
    return this.getRepository("CheckHealthCheck");
  }
  getNixstatsRepository() {
    return this.getRepository("Nixstats");
  }
  getIncidentRepository() {
    return this.getRepository("Incident");
  }
  getApplicationRepository() {
    return this.getRepository("Application");
  }
  getLocationRepository() {
    return this.getRepository("Location");
  }
  getCompanyRepository() {
    return this.getRepository("Company");
  }
  getTwoFactorRepository() {
    return this.getRepository("TwoFactor");
  }
};
var RepositoryCollection_default = RepositoryCollection;

// src/Connection/SessionConnector.ts
var import_axios = __toESM(require("axios"));
var SessionConnector = class {
  constructor(environment, axios3) {
    this.environment = environment;
    this.axios = axios3;
  }
  getSessionToken() {
    return __async(this, null, function* () {
      const sessionTokenResponse = yield this.axios.get(this.getSessionEndpoint(), { withCredentials: true });
      const responseObj = JSON.parse(JSON.stringify(sessionTokenResponse.data));
      const sessionToken = responseObj.access;
      if (!(sessionToken == null ? void 0 : sessionToken.startsWith("ey"))) {
        if (!sessionToken)
          throw new Error("No session token found");
        throw new Error(`The returned token is no a valid. Given "${sessionToken.slice(0, 20)}...".`);
      }
      return {
        sessionToken,
        timezone: responseObj.timezone,
        nickname: responseObj.nickname,
        firstName: responseObj.firstName,
        familyName: responseObj.familyName,
        isLicensePartner: responseObj.isLicensePartner,
        isTrial: responseObj.isTrial,
        responseObj
      };
    });
  }
  setTimezone(timezone) {
    return __async(this, null, function* () {
      try {
        yield this.axios.put(this.getSessionEndpoint("/profile"), {
          timezone
        }, { withCredentials: true });
      } catch (err) {
        console.error(err);
      }
    });
  }
  static connect(client, args) {
    return __async(this, null, function* () {
      if (!("axios" in args)) {
        args.axios = import_axios.default;
      }
      if (typeof args.axios !== "function") {
        throw new Error("The axios argument is not a function. Seems like it is not a valid axios object,");
      }
      const sessionConnector = new SessionConnector(client.getEnvironment(), args.axios);
      const { sessionToken } = yield sessionConnector.getSessionToken();
      args.sessionToken = sessionToken;
      yield client.connect(args);
      return client;
    });
  }
  getSessionEndpoint(path = "/token") {
    const domain = window.location.hostname;
    const domainRegex = /(koality(\.stage)?\.360monitoring|stage\.site-quality-monitoring|site-quality-monitoring)\.com/;
    if (domain.includes("koality.io")) {
      switch (this.environment) {
        case "local" /* Local */:
          throw new Error("The get session should not be used on local development. Please check your white label config for localhost.");
        case "stage" /* Stage */:
          return "https://monitoring.platform360.staging.plesk.tech/token" /* Stage */;
        case "production" /* Production */:
          return "https://monitoring.platform360/token" /* Production */;
        default:
          throw new Error('The given environment "' + this.environment + '" is unknown.');
      }
    } else if (domainRegex.test(domain)) {
      return `https://${["auth", ...domain.split(domain.includes("koality") ? "." : "://").slice(domain.includes("koality") ? 1 : 0)].join(".")}${path}`;
    } else {
      const monitoringDomain = domain.replace("sitecheck", "monitoring");
      return `https://${monitoringDomain}${path}`;
    }
  }
};
var SessionConnector_default = SessionConnector;

// src/Repository/Constants/Marketplace.ts
var Marketplace_default = {
  FEATURE_LANGUAGE_MULTI: "feature.language_multi",
  FEATURE_EXTRA_RESULTS: "plugins.extra.results",
  FEATURE_PASSWORD: "feature.password",
  FEATURE_PAYMENT: "feature.payment",
  FEATURE_PAID_SUBSCRIPTION: "feature.paid_subscription",
  FEATURE_ALPHA: "feature.alpha",
  STATUS_TIME_SERIES_NUMERIC: "time_series_numeric",
  STATUS_TIME_SERIES_PERCENT: "time_series_percent",
  FEATURE_STATUS_IDEA: "100",
  FEATURE_STATUS_ALPHA: "200",
  FEATURE_STATUS_BETA: "300",
  FEATURE_STATUS_LIVE: "400",
  FEATURE_CRAWL_DEPTH_2000: "plugins.crawl_depth_2000",
  FEATURE_CRAWL_DEPTH_5000: "plugins.crawl_depth_5000",
  FEATURE_COMPONENT_LIMIT_30: "plugins.component_limit30",
  FEATURE_COMPONENT_LIMIT_50: "plugins.component_limit50",
  FEATURE_COMPONENT_LIMIT_100: "plugins.component_limit100",
  _GENERATED: true
};

// src/360ApiClient.ts
var LeankoalaClient = class {
  constructor(environment = "production", provider = "koality", headerMeta = {}) {
    this._repositoryCollection = new RepositoryCollection_default();
    this._clusterConnection = false;
    this._masterConnection = false;
    this._user = {};
    this._companies = {};
    this._currentCompany = false;
    this._axios = false;
    this._environment = environment;
    this._connectionStatus = "disconnected";
    this._registeredEventListeners = {};
    this._masterToken = "";
    this._provider = provider;
    this._headerMeta = headerMeta;
    this._routes = {
      masterRefresh: {
        version: 1,
        path: "{application}/auth/refresh/{user}",
        method: "POST"
      },
      clusterRefresh: {
        version: 1,
        path: "auth/tokens/refresh/{user_id}",
        method: "POST"
      }
    };
  }
  connect(args) {
    return __async(this, null, function* () {
      args.autoSelectCompany = args.autoSelectCompany || false;
      this._connectionStatus = "connecting";
      let result;
      try {
        this._repositoryCollection = new RepositoryCollection_default();
        result = yield this._initConnection(__spreadProps(__spreadValues({}, args), { axios: import_axios2.default }));
      } catch (error) {
        this._connectionStatus = "disconnected";
        throw error;
      }
      this._connectionStatus = "connected";
      return result;
    });
  }
  isConnected() {
    if (!this._masterConnection)
      return false;
    return Math.floor(Date.now() / 1e3) < this._masterConnection.getExpireDate();
  }
  getEnvironment() {
    return this._environment;
  }
  setLanguage(language) {
    this._masterConnection.setLanguage(language);
    if (this._clusterConnection) {
      this._clusterConnection.setLanguage(language);
    }
  }
  getWakeUpToken() {
    const tokenObject = {
      master: this._masterConnection.getWakeUpToken(),
      company: this._currentCompany,
      user: this.getUser(),
      cluster: this._clusterConnection ? this._clusterConnection.getWakeUpToken() : null
    };
    return JSON.stringify(tokenObject);
  }
  _initConnection(args) {
    return __async(this, null, function* () {
      this._axios = args.axios;
      let result = null;
      if ("noLogin" in args) {
        this._masterConnection = new Connection_default(this._getMasterServer(), args.axios, this._provider, this._headerMeta);
        this._repositoryCollection.setMasterConnection(this._masterConnection);
      } else if ("sessionToken" in args) {
        yield this._initConnectionViaSessionToken(args);
      } else if ("wakeUpToken" in args) {
        yield this._initConnectionViaWakeUpToken(args);
      } else if ("accessToken" in args && args.accessToken) {
        yield this._initConnectionViaMasterTokens(args);
      } else if ("refreshToken" in args) {
        yield this._initConnectionViaRefreshToken(args);
      } else if ("deprecatedSessionTokenAndConfirmCode" in args && "deprecatedSessionToken" in args && "confirmationCode" in args) {
        result = yield this._initConnectionViaDeprecatedSessionTokenAndConfirmCode(args);
      } else {
        yield this._initConnectionViaCredentials(args);
      }
      this._registerConnectionListeners();
      return result;
    });
  }
  _initConnectionViaWakeUpToken(args) {
    return __async(this, null, function* () {
      if (!("wakeUpToken" in args))
        throw new Error("WakeUp Token is missing");
      const wakeUpToken = JSON.parse(args.wakeUpToken);
      this._masterUser = wakeUpToken.user;
      this._currentCompany = wakeUpToken.company;
      this._masterConnection = new Connection_default(this._getMasterServer(), args.axios, this._provider, this._headerMeta);
      const masterConnectionArgs = args;
      const masterWakeUpToken = wakeUpToken.master;
      masterWakeUpToken.user.id = this._masterUser.masterId;
      masterConnectionArgs.wakeUpToken = JSON.stringify(masterWakeUpToken);
      this._masterConnection.setRefreshRoute(this._routes.masterRefresh);
      yield this._masterConnection.connect(masterConnectionArgs);
      this._repositoryCollection.setMasterConnection(this._masterConnection);
      const user = this._masterConnection.getUser();
      this._masterUser.preferredLanguage = user.preferredLanguage;
      this._masterUser.threeSixtyId = user.threeSixtyId;
      if (wakeUpToken.company) {
        this._clusterConnection = new Connection_default(wakeUpToken.company.cluster.apiEndpoint, args.axios, this._provider, this._headerMeta);
        this._clusterConnection.setRefreshRoute(this._routes.clusterRefresh);
        const clusterConnectionArgs = args;
        clusterConnectionArgs.wakeUpToken = JSON.stringify(wakeUpToken.cluster);
        yield this._clusterConnection.connect(clusterConnectionArgs);
        this._repositoryCollection.setClusterConnection(this._clusterConnection);
      }
    });
  }
  _initConnectionViaCredentials(args) {
    return __async(this, null, function* () {
      const apiServer = this._getMasterServer();
      LeankoalaClient._assertAxios(args);
      this._axios = args.axios;
      this._masterConnection = new Connection_default(apiServer, this._axios, this._provider, this._headerMeta);
      const route = { version: 1, path: "{application}/auth/login", method: "POST" };
      const withMemories = Boolean(args.withMemories || false);
      const result = yield this._masterConnection.send(route, {
        emailOrUserName: args.username,
        password: args.password,
        application: this._provider,
        withMemories
      }, true);
      this._handleLoginData(result);
      if (args.autoSelectCompany) {
        yield this._autoSelectCompany();
      }
    });
  }
  static _assertAxios(args) {
    if (!("axios" in args)) {
      throw new Error("Missing parameter axios. The HTTP client must be injected.");
    }
    if (typeof args.axios !== "function") {
      throw new Error("The axios argument is not a function. Seems like it is not a valid axios object,");
    }
  }
  _initConnectionViaSessionToken(args) {
    return __async(this, null, function* () {
      const apiServer = this._getMasterServer();
      LeankoalaClient._assertAxios(args);
      this._axios = args.axios;
      this._masterConnection = new Connection_default(apiServer, this._axios, this._provider, this._headerMeta);
      const route = { version: 1, path: "360/auth/session", method: "POST" };
      const withMemories = Boolean(args.withMemories || false);
      const result = yield this._masterConnection.send(route, {
        sessionToken: args.sessionToken,
        withMemories
      }, true);
      this._handleLoginData(result);
      if (args.autoSelectCompany) {
        yield this._autoSelectCompany();
      }
    });
  }
  _initConnectionViaDeprecatedSessionTokenAndConfirmCode(args) {
    return __async(this, null, function* () {
      const apiServer = this._getMasterServer();
      LeankoalaClient._assertAxios(args);
      this._axios = args.axios;
      this._masterConnection = new Connection_default(apiServer, this._axios, this._provider, this._headerMeta);
      const route = { version: 1, path: "{application}/auth/session-deprecated/confirm", method: "POST" };
      const withMemories = Boolean(args.withMemories || false);
      const result = yield this._masterConnection.send(route, {
        deprecatedSessionToken: args.deprecatedSessionToken,
        confirmationCode: args.confirmationCode,
        withMemories
      }, true);
      this._handleLoginData(result);
      if (args.autoSelectCompany) {
        yield this._autoSelectCompany();
      }
      return result;
    });
  }
  _handleLoginData(loginData) {
    this._masterToken = loginData.token;
    this._refreshToken = loginData.refreshToken;
    this._masterUser = loginData.user;
    this._masterConnection.setUser(loginData.user);
    this._masterUser.masterId = loginData.user.id;
    if (loginData.memories) {
      this._masterUser.memories = loginData.memories;
    }
    this._companies = loginData.companies;
    this._masterConnection.setAccessToken(this._masterToken, this._refreshToken);
    this._repositoryCollection.setMasterConnection(this._masterConnection);
  }
  _initConnectionViaRefreshToken(args) {
    return __async(this, null, function* () {
      this._masterConnection = new Connection_default(this._getMasterServer(), args.axios, this._provider, this._headerMeta);
      this._masterConnection.setRefreshRoute(this._routes.masterRefresh);
      yield this._masterConnection.connect(args);
      this._masterUser = this._masterConnection.getUser();
      this._masterUser.masterId = this._masterUser.id;
      this._masterToken = this._masterConnection.getAccessToken();
      this._companies = this._masterUser.companies;
      this._repositoryCollection.setMasterConnection(this._masterConnection);
      if (args.autoSelectCompany) {
        yield this._autoSelectCompany();
      }
    });
  }
  _initConnectionViaMasterTokens(args) {
    return __async(this, null, function* () {
      this._masterConnection = new Connection_default(this._getMasterServer(), args.axios, this._provider, this._headerMeta);
      this._masterConnection.setAccessToken(args.accessToken, args.refreshToken);
      this._masterToken = args.accessToken;
      if ("user" in args) {
        this._masterConnection.setUser(args.user);
        this._user = args.user;
        this._user.masterId = args.user.id;
        this._masterUser = args.user;
        this._companies = args.user.companies;
      }
      this._repositoryCollection.setMasterConnection(this._masterConnection);
      if (args.autoSelectCompany) {
        yield this._autoSelectCompany();
      }
    });
  }
  _autoSelectCompany() {
    return __async(this, null, function* () {
      if (this._companies.length === 0) {
        throw new Error("Unable to auto select the company. User is not connected to any.");
      }
      const company = this._companies[0];
      yield this.switchCompany(company.id);
    });
  }
  switchCompany(companyId) {
    return __async(this, null, function* () {
      const client = this;
      let currentCompany;
      this._companies.forEach(function(company) {
        if (company.id === companyId) {
          currentCompany = company;
        }
      });
      if (currentCompany) {
        yield client._switchCluster(currentCompany.cluster);
        this._currentCompany = currentCompany;
      } else {
        throw new Error("Unable to select the company. Company id not connected to user.");
      }
    });
  }
  _switchCluster(cluster) {
    return __async(this, null, function* () {
      this._clusterConnection = new Connection_default(cluster.apiEndpoint, this._axios, this._provider, this._headerMeta);
      this._repositoryCollection.setClusterConnection(this._clusterConnection);
      this._clusterConnection.addDefaultParameter("masterUserId", this._masterUser.id);
      yield this._clusterConnection.connect({ loginToken: this._masterToken });
      const clusterUser = this._clusterConnection.getUser();
      this._masterUser.clusterId = clusterUser.id;
      this._masterUser.id = clusterUser.id;
    });
  }
  _getMasterServer() {
    switch (this._environment) {
      case "local" /* Local */:
        return "http://localhost:8082/" /* Local */;
      case "stage" /* Stage */:
        return "https://auth.stage.koalityengine.com/" /* Stage */;
      case "production" /* Production */:
        return "https://auth.koalityengine.com/" /* Production */;
      default:
        throw new Error('The given environment "' + this._environment + '" is unknown.');
    }
  }
  _registerConnectionListeners() {
    const masterConnection = this._masterConnection;
    const clusterConnection = this._clusterConnection;
    const listeners = this._registeredEventListeners;
    Object.keys(listeners).forEach((key) => {
      listeners[key].forEach((element) => {
        masterConnection.on(key, element);
        if (clusterConnection) {
          clusterConnection.on(key, element);
        }
      });
    });
  }
  getRepository(entityType) {
    return __async(this, null, function* () {
      if (this._connectionStatus === "disconnected") {
        throw new Error("Please connect the client before running this method.");
      }
      if (this._connectionStatus === "connected") {
        return this._repositoryCollection.getRepository(entityType);
      }
      if (this._connectionStatus === "connecting") {
        while (this._connectionStatus === "connecting") {
          yield this._sleep(300);
        }
        return this.getRepository(entityType);
      }
    });
  }
  getRepositoryCollection() {
    return __async(this, null, function* () {
      if (this._connectionStatus === "disconnected") {
        throw new Error("Please connect the client before running this method.");
      }
      if (this._connectionStatus === "connected") {
        return this._repositoryCollection;
      }
      if (this._connectionStatus === "connecting") {
        while (this._connectionStatus === "connecting") {
          yield this._sleep(300);
        }
        return this.getRepositoryCollection();
      }
      return this._repositoryCollection;
    });
  }
  _sleep(milliseconds) {
    return __async(this, null, function* () {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    });
  }
  getUser() {
    if (!this._masterUser) {
      throw new Error("No user found. Please run connect() to login in.");
    }
    return this._masterUser;
  }
  getCompany() {
    return this._currentCompany;
  }
  on(eventName, callback) {
    if (!(eventName in this._registeredEventListeners)) {
      this._registeredEventListeners[eventName] = [];
    }
    this._registeredEventListeners[eventName].push(callback);
    if (this._masterConnection) {
      this._masterConnection.on(eventName, callback);
    }
    if (this._clusterConnection) {
      this._clusterConnection.on(eventName, callback);
    }
  }
  fetchAll(promises) {
    return __async(this, null, function* () {
      const promiseArray = [];
      const results = {};
      let count = 0;
      Object.keys(promises).forEach((element) => promiseArray.push(promises[element]));
      const promiseResults = yield Promise.allSettled(promiseArray);
      Object.keys(promises).forEach((element) => {
        results[element] = promiseResults[count].value;
        count++;
      });
      return results;
    });
  }
  isWakeUpTokenExpired(token) {
    const { master, cluster } = JSON.parse(token);
    const time = Math.floor(new Date().getTime() / 1e3);
    if (!cluster || cluster.expireDate < time) {
      return true;
    }
    return !master || master.expireDate < time;
  }
  setRefreshToken(token) {
    this._refreshToken = token;
  }
  setMemory(application, key, value) {
    return __async(this, null, function* () {
      const memoryRepo = yield this.getRepository("memory");
      yield memoryRepo.set("360monitoring", "user", this.getUser().masterId, { key, value });
      this._masterUser.memories[key] = value;
    });
  }
};
//# sourceMappingURL=360ApiClient.js.map
