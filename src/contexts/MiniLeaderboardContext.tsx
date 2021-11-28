import { getLeaderboardData } from "api/getLeaderboardData";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Leaderboard, LeaderboardConfig } from "types/Leaderboard";
import { sleep } from "utils/sleep";
import { ServerContext } from "./ServerProvider";

export const MiniLeaderboardContext = createContext<{
  lbData?: Leaderboard;
  lastUpdated?: Date;
  lbConfig?: LeaderboardConfig;
  setLbConfig?: (cfg: LeaderboardConfig) => void;
}>({});

export const MiniLeaderboardProvider: FC<{
  lbData?: Record<string, Record<string, Leaderboard>>;
}> = ({ lbData: lbDataStatic, children }) => {
  const { server } = useContext(ServerContext);
  const [lbConfig, setLbConfig] = useState<LeaderboardConfig>();
  const [lbData, setLbData] = useState<Leaderboard>();
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [interval] = useState<number>(20000);

  useEffect(() => {
    if (lbDataStatic || !lbConfig) return;
    let killMe = false;
    const loop = async () => {
      while (!killMe) {
        try {
          const data = await getLeaderboardData(server)(lbConfig);
          if (killMe) break;
          setLbData(data);
          setLastUpdated(new Date());
        } finally {
          await sleep(interval);
        }
      }
    };
    loop();
    return () => {
      killMe = true;
    };
  }, [interval, server, lbConfig]);

  useEffect(() => {
    setLbData([]);
  }, [server]);

  return (
    <MiniLeaderboardContext.Provider
      value={{
        lbData,
        lastUpdated,
        lbConfig,
        setLbConfig,
      }}
    >
      {children}
    </MiniLeaderboardContext.Provider>
  );
};
