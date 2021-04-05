import { getLeaderboardData } from "api/getLeaderboardData";
import { createContext, FC, useEffect, useRef, useState } from "react";
import { Leaderboard } from "types/Leaderboard";
import { sleep } from "utils/sleep";

export const LeaderboardContext = createContext<{
  lbData?: Leaderboard;
  lastUpdated?: Date;
}>({});

export const LeaderboardProvider: FC<{ lbData?: Leaderboard }> = ({
  lbData: lbDataStatic,
  children,
}) => {
  const [lbData, setLbData] = useState<Leaderboard>();
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [interval] = useState<number>(20000);

  useEffect(() => {
    if (lbDataStatic) return;
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
    <LeaderboardContext.Provider
      value={{ lbData: lbDataStatic || lbData, lastUpdated }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};
