import { createContext, useContext, useState } from "react";
import { BasicStatus } from "../models/statuses";

type AssetState = {
  status: BasicStatus;
};

const context = createContext<AssetState>({
  status: { type: "initial" },
});

export const useAsset = () => useContext(context);

export function AssetProvider({
  children,
  state,
}: {
  children: any;
  state?: AssetState;
}) {
  state ??= useAssetState();
  return <context.Provider value={state}>{children}</context.Provider>;
}

export const useAssetState = (): AssetState => {
  const [status, setStatus] = useState<BasicStatus>({ type: "initial" });

  return { status };
};
