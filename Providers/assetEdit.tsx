import { createContext, useContext, useState } from "react";
import { BasicStatus } from "../models/statuses";

interface AssetInputs {
  symbol: string;
  name: string;
  totalQty: string;
  availableQty: string;
  account: number;
}

type AssetEditState = {
  status: BasicStatus;
  createAsset: (inputs: AssetInputs) => void;
};

const context = createContext<AssetEditState>({
  status: { type: "initial" },
  createAsset: async () => ({
    id: 0,
    symbol: "",
    name: "",
    totalQty: "",
    availableQty: "",
    account: 0,
  }),
});

export const useAssetEdit = () => useContext(context);

export function AssetEditProvider({
  children,
  state,
}: {
  children: any;
  state?: AssetEditState;
}) {
  state ??= useAssetEditState();
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useAssetEditState = (): AssetEditState => {
  const [status, setStatus] = useState<BasicStatus>({ type: "initial" });

  const createAsset = async (inputs: AssetInputs) => {
    try {
      setStatus({ type: "loading" });
      console.log("createAsset - Metodas");
      console.log(inputs);
      setStatus({ type: "success" });
    } catch (e) {
      setStatus({ type: "error", message: `${e}` });
    }
  };

  return { status, createAsset };
};
