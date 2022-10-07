import * as authClient from "firebase/auth";
import { setCookie, destroyCookie, parseCookies } from "nookies";

import * as models from "../../../models";

export type ClientAuthUser = authClient.User;

export type ClientCredential = authClient.UserCredential;

export enum AuthProvider {
  email = "password",
  facebook = "facebook.com",
  google = "google.com",
  apple = "apple.com",
  twitter = "twitter.com",
}

// export type ClientEmailLoginData = {
//   url: string
//   dynamicLinkDomain: string
//   packageName?: string
//   minimumVersion?: string
//   installApp?: boolean
// }

export class ClientAuthentication {
  private auth: authClient.Auth;
  // private emailLoginData: ClientEmailLoginData

  constructor(auth: authClient.Auth) {
    // , emailLoginData: ClientEmailLoginData
    this.auth = auth;
    // this.emailLoginData = emailLoginData
  }

  private _getSSOProvider(provider: AuthProvider) {
    const oauth = new authClient.OAuthProvider(provider);
    if (provider === AuthProvider.apple) {
      oauth.addScope("email");
      oauth.addScope("name");
    }
    return oauth;
  }

  private _getEmailLinkCredential(email: string, emailLink: string) {
    return authClient.EmailAuthProvider.credentialWithLink(email, emailLink);
  }

  private _mapUser(user: authClient.User) {
    return new models.c.User({
      id: user.uid,
      email: user.email ?? "",
      name: user.displayName ?? "",
      provider: user.providerData.length
        ? user.providerData[0]!.providerId
        : "",
    });
  }

  private _getUser() {
    return this.auth.currentUser;
  }

  getUser() {
    const user = this._getUser();
    if (user) return this._mapUser(user);
    return undefined;
  }

  async refreshToken(): Promise<boolean> {
    const user = this._getUser();
    if (user !== null) {
      const { token } = parseCookies(null);
      const newToken = await user.getIdToken(true);
      await destroyCookie(null, "token");
      await setCookie(null, "token", newToken, { path: "/" });
      return true;
    }
    return false;
  }

  onAuthStateChanged(callback: (user?: models.c.User) => void) {
    return this.auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        destroyCookie(null, "token");
        setCookie(null, "token", token, { path: "/" });
      } else {
        destroyCookie(null, "token");
      }
      const u = user ? this._mapUser(user) : undefined;
      callback(u);
    });
  }

  async fetchSignInMethodsForEmail(email: string) {
    return authClient.fetchSignInMethodsForEmail(this.auth, email);
  }

  async changeDisplayName(name: string) {
    const user = this._getUser();
    if (!user) throw Error("User is logged out");
    await authClient.updateProfile(user, {
      displayName: name,
    });
  }

  async changeEmail(newEmail: string, emailLink: string) {
    const user = this._getUser();
    if (!user) throw Error("User is logged out");
    const provider = user.providerData.length
      ? user.providerData[0]!.providerId
      : "";
    if (user.email && provider === AuthProvider.email) {
      const credential = this._getEmailLinkCredential(user.email, emailLink);
      return authClient
        .reauthenticateWithCredential(user, credential)
        .then(async (result) => authClient.updateEmail(result.user, newEmail));
    }
    throw Error("User provider is not email");
  }

  async linkWithEmailLink(email: string, emailLink: string) {
    const credential = this._getEmailLinkCredential(email, emailLink);
    const user = this._getUser();
    if (!user) throw Error("User is logged out");
    return authClient
      .linkWithCredential(user, credential)
      .then((result) => this._mapUser(result.user))
      .catch(
        (error) =>
          ({
            code: error.code,
            message: error.message,
            email: error.email,
          } as AuthError)
      );
  }

  async linkWithSSO(provider: AuthProvider) {
    const sso = this._getSSOProvider(provider);
    const user = this._getUser();
    if (!user) throw Error("User is logged out");
    return authClient
      .linkWithPopup(user, sso)
      .then((result) => this._mapUser(result.user))
      .catch(
        (error) =>
          ({
            code: error.code,
            message: error.message,
            email: error.email,
          } as AuthError)
      );
  }

  // async sendSignInLinkToEmail(email: string) {
  //   const packageName = this.emailLoginData.packageName
  //   const minimumVersion = this.emailLoginData.minimumVersion
  //   const url = this.emailLoginData.url
  //   if (!url) throw Error('Missing url.')
  //   console.log({
  //     url,
  //     dynamicLinkDomain: this.emailLoginData.dynamicLinkDomain,
  //     handleCodeInApp: true,
  //     iOS: packageName
  //       ? {
  //           bundleId: packageName,
  //         }
  //       : undefined,
  //     android: packageName
  //       ? {
  //           packageName,
  //           minimumVersion,
  //           installApp: this.emailLoginData.installApp,
  //         }
  //       : undefined,
  //   })
  //   await authClient.sendSignInLinkToEmail(this.auth, email, {
  //     url,
  //     dynamicLinkDomain: this.emailLoginData.dynamicLinkDomain,
  //     handleCodeInApp: true,
  //     iOS: packageName
  //       ? {
  //           bundleId: packageName,
  //         }
  //       : undefined,
  //     android: packageName
  //       ? {
  //           packageName,
  //           minimumVersion,
  //           installApp: this.emailLoginData.installApp,
  //         }
  //       : undefined,
  //   })
  // }

  // isSignInWithEmailLink(link: string) {
  //   return authClient.isSignInWithEmailLink(this.auth, link)
  // }

  // async signInWithEmailLink(email: string, link: string) {
  //   return authClient.signInWithEmailLink(this.auth, email, link)
  // }

  async resetPasswordSendEmail(email: string) {
    return authClient.sendPasswordResetEmail(this.auth, email);
  }

  async resetPasswordConfirm(oobCode: string, newPassword: string) {
    return authClient.confirmPasswordReset(this.auth, oobCode, newPassword);
  }

  async registerWithEmailPassword(email: string, password: string) {
    return authClient.createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async signInWithEmailPassword(email: string, password: string) {
    return authClient.signInWithEmailAndPassword(this.auth, email, password);
  }

  async changePassword(user: authClient.User, newPassword: string) {
    return authClient.updatePassword(user, newPassword);
  }

  async signInWithSSO(provider: AuthProvider) {
    const sso = this._getSSOProvider(provider);
    return authClient
      .signInWithPopup(this.auth, sso)
      .then((c) => this._mapUser(c.user))
      .catch(
        (error) =>
          ({
            code: error.code,
            message: error.message,
            email: error.email,
          } as AuthError)
      );
  }

  async signOut() {
    return authClient.signOut(this.auth);
  }

  async deleteWithEmailLink(email: string, emailLink: string) {
    const credential = this._getEmailLinkCredential(email, emailLink);
    const user = this._getUser();
    if (!user) throw Error("User is logged out");

    return authClient
      .reauthenticateWithCredential(user, credential)
      .then((uc) => authClient.deleteUser(uc.user));
  }

  async deleteWithSSO(provider: AuthProvider) {
    const sso = this._getSSOProvider(provider);
    const user = this._getUser();
    if (!user) throw Error("User is logged out");
    return authClient
      .reauthenticateWithPopup(user, sso)
      .then((uc) => authClient.deleteUser(uc.user));
  }
}

interface AuthError {
  code:
    | "auth/account-exists-with-different-credential"
    | "auth/auth-domain-config-required"
    | "auth/cancelled-popup-request"
    | "auth/email-already-in-use"
    | "auth/invalid-continue-uri"
    | "auth/invalid-email"
    | "auth/missing-android-pkg-name"
    | "auth/missing-continue-uri"
    | "auth/missing-ios-bundle-id"
    | "auth/operation-not-allowed"
    | "auth/operation-not-supported-in-this-environment"
    | "auth/popup-blocked"
    | "auth/popup-closed-by-user"
    | "auth/requires-recent-login"
    | "auth/unauthorized-continue-uri"
    | "auth/unauthorized-domain"
    | "auth/user-disabled"
    | "auth/user-not-found"
    | "auth/weak-password"
    | "auth/wrong-password"
    | "loggedOut"
    | "unknown";
  message: string;
  email?: string;
}
