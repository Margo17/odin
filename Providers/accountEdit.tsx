import { createContext, useContext, useState } from "react";
import { BasicStatus } from "../models/statuses";
import { useUser } from "./user";

interface AccountInputs {
  name: string;
  baseCurrency: string;
  exchange: string;
  apiKey: string;
  secret: string;
  primary: boolean;
}

type AccountEditState = {
  status: BasicStatus;
  createAccount: (inputs: AccountInputs) => void;
  editAccount: (inputs: AccountInputs) => void;
};

const context = createContext<AccountEditState>({
  status: { type: "initial" },
  createAccount: async () => ({
    id: 0,
    name: "",
    baseCurrency: "",
    exchange: "",
    apiKey: "",
    secret: "",
    primary: false,
    user: "",
  }),
  editAccount: async () => ({
    id: 0,
    name: "",
    baseCurrency: "",
    exchange: "",
    apiKey: "",
    secret: "",
    primary: false,
    user: "",
  }),
});

export const useAccountEdit = () => useContext(context);

export function AccountEditProvider({
  children,
  state,
}: {
  children: any;
  state?: AccountEditState;
}) {
  state ??= useAccountEditState();
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useAccountEditState = (): AccountEditState => {
  const userState = useUser();
  const [status, setStatus] = useState<BasicStatus>({ type: "initial" });

  const createAccount = async (inputs: AccountInputs) => {
    try {
      setStatus({ type: "loading" });
      console.log("Create Accounts - Metodas");
      console.log(inputs);
      setStatus({ type: "success" });
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  const editAccount = async (inputs: AccountInputs) => {
    try {
      setStatus({ type: "loading" });
      console.log("editAccounts - Metodas");
      console.log(inputs);
      setStatus({ type: "success" });
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  return { status, createAccount, editAccount };
};
