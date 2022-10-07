import React, { createContext, useContext, useEffect, useState } from "react";

import { combineLatest, Observable } from "rxjs";
import UserProfile from "../components/authentication/UserProfile";
import { Bucket } from "../firebase/base/services/storage";
import { services } from "../firebase/client";

import * as models from "../models";
import { InitialStatus, LoadingStatus, ErrorStatus } from "../models/statuses";
import { useClientSide } from "./client_side";

interface SuccessfulUserLoginStatus {
  type: "login";
  data: UserData;
}

interface SuccessfulUserLogoutStatus {
  type: "logout";
}

type UserStatus =
  | InitialStatus
  | LoadingStatus
  | ErrorStatus
  | SuccessfulUserLoginStatus
  | SuccessfulUserLogoutStatus;

type UserState = {
  status: UserStatus;
};

type UserData = {
  user: models.c.User;
  // accounts: models.c.Account[];
};

const context = createContext<UserState>({
  status: { type: "initial" },
});

export const useUser = () => useContext(context);

/// [UserProvider] should wrap all the app.
export function UserProvider({
  children,
  user,
  state,
}: {
  children: any;
  user?: models.c.User;
  state?: UserState;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useUserState(user);
  return <context.Provider value={state}>{children}</context.Provider>;
}

/// state is private, because [UserState] needs to only be accessed from provider.
export const useUserState = (serverUser?: models.c.User): UserState => {
  const clientSide = useClientSide();

  const [status, setStatus] = useState<UserStatus>({
    type: serverUser ? "loading" : "initial",
  });
  const [authUser, setAuthUser] = useState<models.c.User | undefined>(
    serverUser
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const unsubscribe = clientSide?.auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });
    if (unsubscribe) return () => unsubscribe();
  }, [clientSide]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      if (clientSide) {
        if (authUser) {
          setStatus({ type: "loading" });

          const userId = authUser.id;
          const streamUser = new Observable<models.c.User>((observer) =>
            clientSide?.db.streamDocument(
              (doc) => observer.next(doc),
              new models.c.User(),
              models.e.DatabaseCollection.users,
              userId
            )
          );
          // const streamUserAccounts = new Observable<models.c.Account[]>(
          //   (observer) =>
          //     clientSide?.db.streamDocuments(
          //       (doc) => observer.next(doc),
          //       new models.c.Account(),
          //       models.e.DatabaseCollection.accounts,
          //       [
          //         {
          //           type: "where",
          //           field: "userId",
          //           operator: "==",
          //           value: userId,
          //         },
          //         {
          //           type: "orderBy",
          //           field: "dateCreated",
          //           direction: "desc",
          //         },
          //       ]
          //     )
          // );

          const subscription = combineLatest([
            streamUser,
            // streamUserAccounts,
          ]).subscribe({
            next: async (value) => {
              const user = value[0];
              // const accounts = value[1];
              await checkUser(user);

              if (!user) {
                const data: UserData = {
                  user: new models.c.User(),
                  // accounts: [],
                };
                setStatus({
                  type: "login",
                  data,
                });
              } else {
                const data: UserData = {
                  user,
                  // accounts,
                };
                setStatus({
                  type: "login",
                  data,
                });
              }
            },
            error: (e) => setStatus({ type: "error", message: e }),
          });
          return () => {
            subscription.unsubscribe();
          };
        }
        setStatus({ type: "logout" });
      }
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  }, [authUser?.id, clientSide]);

  const checkUser = async (user: models.c.User) => {
    const userChanges: { [k: string]: any } = {};
    if (Object.values(userChanges).length > 0) {
      await clientSide?.db.updateDocument(
        userChanges,
        models.e.DatabaseCollection.users,
        user.id
      );
    }
  };
  return {
    status,
  };
};
