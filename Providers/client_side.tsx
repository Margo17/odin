import React, { createContext, useContext, useEffect, useState } from "react";

import { ClientSide, ClientSideConfig } from "../firebase/client";

const context = createContext<ClientSide | null>(null);

export const useClientSide = () => useContext(context);

export function ClientSideProvider({
  children,
  config,
}: {
  children: any;
  config: ClientSideConfig;
}) {
  const state = useClientSideState(config);
  return <context.Provider value={state}>{children}</context.Provider>;
}

const useClientSideState = (config: ClientSideConfig): ClientSide | null => {
  const [clientSide, setClientSide] = useState<ClientSide | null>(null);

  useEffect(() => {
    const client = new ClientSide(config);
    setClientSide(client);
  }, []);

  return clientSide;
};
