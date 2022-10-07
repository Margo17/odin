import React, { createContext, useContext, useState } from "react";

import { services } from "../firebase/client";
import { BasicStatus } from "../models/statuses";
import { useClientSide } from "./client_side";
// import { useLocalSelections } from '../Singletons/local_selections';

interface DifferentProviderStatus {
  type: "differentProvider";
  provider: services.AuthProvider;
  email: string;
}

interface EmailSentStatus {
  type: "emailSent";
}

interface NeedsTermsConfirmationStatus {
  type: "needsTermsConfirmation";
  email: string;
}

type AuthStatus =
  | BasicStatus
  | DifferentProviderStatus
  | EmailSentStatus
  | NeedsTermsConfirmationStatus;

type AuthState = {
  status: AuthStatus;
  clearState: () => void;
  logOut: () => void;
  login: (
    provider: services.AuthProvider,
    email?: string,
    password?: string
  ) => void;
  refreshToken: () => void;
  registerUser: (email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (oobCode: string, newPassword: string) => void;
};

const context = createContext<AuthState>({
  status: { type: "initial" },
  clearState: () => ({}),
  logOut: () => ({}),
  login: () => ({}),
  refreshToken: () => ({}),
  registerUser: () => ({}),
  forgotPassword: () => ({}),
  resetPassword: () => ({}),
});

export const useAuth = () => useContext(context);

export function AuthProvider({
  children,
  state,
}: {
  children: any;
  state?: AuthState;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useAuthState();
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useAuthState = (): AuthState => {
  const clientSide = useClientSide();

  const [status, setStatus] = useState<AuthStatus>({ type: "initial" });
  const clearState = () => {
    setStatus({ type: "initial" });
  };

  const logOut = async () => {
    try {
      setStatus({ type: "loading" });
      await clientSide?.auth.signOut();
      setStatus({ type: "success" });
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  const refreshToken = async () => {
    try {
      await clientSide?.auth.refreshToken();
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  const login = async (
    provider: services.AuthProvider,
    email?: string,
    password?: string
  ) => {
    try {
      setStatus({ type: "loading" });
      if (provider === services.AuthProvider.email && !email && !password) {
        throw Error("Bad credentials.");
      }

      if (provider === services.AuthProvider.email && email && password) {
        const providers =
          (await clientSide?.auth.fetchSignInMethodsForEmail(email)) ?? [];

        if (providers.length === 0) {
          registerUser(email, password);
        } else if (providers.includes(services.AuthProvider.email)) {
          await clientSide?.auth.signInWithEmailPassword(email, password);
          await refreshToken();
          setStatus({ type: "success" });
        } else if (providers.length) {
          setStatus({
            type: "differentProvider",
            provider: providers[0] as services.AuthProvider,
            email,
          });
        }
      } else {
        const user = await clientSide?.auth.signInWithSSO(provider);
        if (!user) throw Error("Could not login");
        if ("message" in user) {
          if (
            user.code === "auth/account-exists-with-different-credential" &&
            user.email
          ) {
            const providers =
              (await clientSide?.auth.fetchSignInMethodsForEmail(user.email)) ??
              [];
            setStatus({
              type: "differentProvider",
              provider: providers[0] as services.AuthProvider,
              email: user.email,
            });
          } else {
            throw Error(user.code);
          }
        } else {
          setStatus({ type: "success" });
        }
      }
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  const registerUser = async (email: string, password: string) => {
    setStatus({ type: "loading" });
    try {
      await clientSide?.auth.registerWithEmailPassword(email, password);
      setStatus({ type: "success" });
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  const forgotPassword = async (email: string) => {
    setStatus({ type: "loading" });
    try {
      await clientSide?.auth.resetPasswordSendEmail(email);
      setStatus({ type: "success" });
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  const resetPassword = async (oobCode: string, newPassword: string) => {
    setStatus({ type: "loading" });
    try {
      await clientSide?.auth.resetPasswordConfirm(oobCode, newPassword);
      setStatus({ type: "success" });
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  return {
    status,
    clearState,
    logOut,
    login,
    refreshToken,
    registerUser,
    forgotPassword,
    resetPassword,
  };
};
