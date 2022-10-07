import * as admin from "firebase-admin";

import * as services from "./services";

export interface CloudCredentials {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  databaseURL: string;
}

export { services };

export class ServerSide {
  auth: services.ServerAuthentication;
  db: services.ServerDatabase;
  storage: services.ServerStorage;

  constructor(credentials: { cloud: CloudCredentials }) {
    const app =
      admin.apps && admin.apps[0]
        ? admin.apps[0]
        : admin.initializeApp({
            credential: admin.credential.cert(credentials.cloud),
            databaseURL: credentials.cloud.databaseURL,
          });
    const firestore = admin.firestore(app);
    const firebaseStorage = admin.storage(app);
    const messaging = admin.messaging(app);
    const auth = admin.auth(app);

    this.auth = new services.ServerAuthentication(auth);
    this.db = new services.ServerDatabase(firestore);
    this.storage = new services.ServerStorage(firebaseStorage);
  }
}

export class LiteServerSide {
  auth: services.ServerAuthentication;
  db: services.ServerDatabase;
  storage: services.ServerStorage;

  constructor(credentials: { cloud: CloudCredentials }) {
    const app =
      admin.apps && admin.apps[0]
        ? admin.apps[0]
        : admin.initializeApp({
            credential: admin.credential.cert(credentials.cloud),
            databaseURL: credentials.cloud.databaseURL,
          });
    const firestore = admin.firestore(app);
    const firebaseStorage = admin.storage(app);
    const auth = admin.auth(app);

    this.auth = new services.ServerAuthentication(auth);
    this.db = new services.ServerDatabase(firestore);
    this.storage = new services.ServerStorage(firebaseStorage);
  }
}
