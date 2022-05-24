import { createContext, Dispatch, SetStateAction, useState } from "react";
import { DJServer } from "types/Server";

export const ServerContext = createContext<{
  server?: DJServer;
  setServer?: Dispatch<SetStateAction<DJServer>>;
}>({});

export const ServerProvider: React.FC<{
  server?: DJServer;
  children: React.ReactNode;
}> = ({ server, children }) => {
  return (
    <ServerContext.Provider value={{ server }}>
      {children}
    </ServerContext.Provider>
  );
};
