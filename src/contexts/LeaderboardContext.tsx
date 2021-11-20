import { getLeaderboardData } from "api/getLeaderboardData";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Leaderboard } from "types/Leaderboard";
import { sleep } from "utils/sleep";
import { ServerContext } from "./ServerProvider";

export const LeaderboardContext = createContext<{
  lbData?: Leaderboard;
  lastUpdated?: Date;
}>({});

export const LeaderboardProvider: FC<{ lbData?: Leaderboard }> = ({
  lbData: lbDataStatic,
  children,
}) => {
  const { server } = useContext(ServerContext);
  const [lbData, setLbData] = useState<Leaderboard>();
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [interval] = useState<number>(20000);

  useEffect(() => {
    if (lbDataStatic) return;
    let killMe = false;
    const loop = async () => {
      while (!killMe) {
        try {
          const data = await getLeaderboardData(server)();
          if (killMe) break;
          setLbData(data);
          setLastUpdated(new Date());
        } finally {
          await sleep(interval);
        }
      }
    };
    loop();
    () => {
      killMe = true;
    };
  }, [interval, server]);

  useEffect(() => {
    setLbData([]);
  }, [server]);

  return (
    <LeaderboardContext.Provider
      value={{ lbData: lbDataStatic || lbData, lastUpdated }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};
