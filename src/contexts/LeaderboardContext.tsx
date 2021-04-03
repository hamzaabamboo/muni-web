import { getLeaderboardData } from "api/getLeaderboardData";
import { createContext, useEffect, useRef, useState } from "react";
import { Leaderboard } from "types/Leaderboard";
import { sleep } from "utils/sleep";

export const LeaderboardContext = createContext<{
  lbData?: Leaderboard;
  lastUpdated?: Date;
}>({});

export const LeaderboardProvider = ({ children }) => {
  const [lbData, setLbData] = useState<Leaderboard>();
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [interval] = useState<number>(20000);

  useEffect(() => {
    let killMe = false;
    const loop = async () => {
      while (!killMe) {
        try {
          const data = await getLeaderboardData();
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
  }, [interval]);

  return (
    <LeaderboardContext.Provider value={{ lbData, lastUpdated }}>
      {children}
    </LeaderboardContext.Provider>
  );
};
