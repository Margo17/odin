import { auth } from "firebase-admin";

import * as models from "../../../models";

export class ServerAuthentication {
  private auth: auth.Auth;

  constructor(auth: auth.Auth) {
    this.auth = auth;
  }

  private _mapUser(user: auth.UserRecord) {
    return new models.c.User({
      id: user.uid,
      email: user.email ?? "",
      name: user.displayName ?? "",
      provider: user.providerData.length
        ? user.providerData[0]?.providerId
        : "",
    });
  }

  async validate(token: string) {
    try {
      const decodedToken = await this.auth.verifyIdToken(token);
      const user = await this.auth.getUser(decodedToken.uid);

      return this._mapUser(user);
    } catch (e) {
      console.error(
        new Error(`[ServerAuthentication] validate: 
          token: ${token},
        `),
        e
      );
      return undefined;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.auth.getUserByEmail(email);
      return this._mapUser(user);
    } catch (e) {
      console.error(
        new Error(`[ServerAuthentication] getUserByEmail: 
          email: ${email},
        `),
        e
      );
      return undefined;
    }
  }
}
