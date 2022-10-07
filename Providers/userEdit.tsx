import React, { createContext, useContext, useState } from "react";
import { Bucket } from "../firebase/base/services/storage";
import { ContentType, DatabaseCollection } from "../models/enums";

import { LoadingStatus, ErrorStatus } from "../models/statuses";
// import { useAuth } from "./authentication";
import { useClientSide } from "./client_side";
import { useUser as userData } from "./user";

interface EditSuccessfulStatus {
  type: "success";
}

type InitialStatus = {
  type: "initial";
};

type UserStatus =
  | InitialStatus
  | LoadingStatus
  | EditSuccessfulStatus
  | ErrorStatus;

type UserState = {
  status: UserStatus;
  editProfile: (name: string, avatar?: File) => void;
};

const context = createContext<UserState>({
  status: { type: "initial" },
  editProfile: () => ({}),
});

export const useEditUser = () => useContext(context);

export function UserProvider({
  children,
  state,
}: {
  children: any;
  state?: UserState;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  state ??= useEditUserState();
  return <context.Provider value={state}>{children}</context.Provider>;
}

/// state is private, because [UserState] needs to only be accessed from provider.
export const useEditUserState = (): UserState => {
  const [status, setStatus] = useState<UserStatus>({
    type: "initial",
  });
  const userState = userData();
  const clientSide = useClientSide();

  const editProfile = async (name: string, avatar?: File) => {
    try {
      if (userState.status.type === "login" && clientSide) {
        setStatus({
          type: "loading",
        });
        let avatarUrl: string | undefined = undefined;
        if (avatar) {
          const avatarArrBuffer: ArrayBuffer = await avatar.arrayBuffer();
          avatarUrl = await clientSide.storage.upload(
            Bucket.ui,
            avatarArrBuffer,
            {
              destination: "test.jpeg",
              contentType: ContentType.jpeg,
              public: true,
            }
          );
        }
        setStatus({
          type: "loading",
        });
        const response = await clientSide?.db.updateDocument(
          {
            name,
            avatarUrl: avatarUrl,
          },
          DatabaseCollection.users,
          userState?.status.data.user.id
        );
        if (response) {
          setStatus({
            type: "success",
          });
        }
      }
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  return {
    status,
    editProfile,
  };
};
