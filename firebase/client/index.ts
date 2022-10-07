import { getRemoteConfig } from "@firebase/remote-config";
import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// import * as base_services from "../base/services/services";
import * as services from "./services";

export interface ClientSideConfig {
  credentials: {
    options: FirebaseOptions;
    // search: base_services.SearchCredentials;
  };
  // analyticsSettings: services.AnalyticsSettings;
  // emailLoginData: services.ClientEmailLoginData
}

export class ClientSide {
  // analytics: services.ClientAnalytics;
  auth: services.ClientAuthentication;
  db: services.ClientDatabase;
  storage: services.ClientStorage;
  functions: services.ClientFunctions;
  remoteConfig: services.ClientRemoteConfig;
  localStorage: services.ClientLocalStorage;

  constructor(config: ClientSideConfig) {
    const app = initializeApp(config.credentials.options);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    // const analytics = getAnalytics(app);
    const functions = getFunctions(app);
    const rConfig = getRemoteConfig(app);

    this.auth = new services.ClientAuthentication(auth);
    // this.analytics = new services.ClientAnalytics(
    //   config.analyticsSettings,
    //   analytics
    // )
    this.db = new services.ClientDatabase(firestore);
    this.storage = new services.ClientStorage(app);
    this.functions = new services.ClientFunctions(functions);
    this.remoteConfig = new services.ClientRemoteConfig(rConfig);
    this.localStorage = new services.ClientLocalStorage();

    this.initialize();
  }

  private async initialize() {
    await this.remoteConfig.initSevice();
  }
}

export { services };
