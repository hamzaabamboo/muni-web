import { getAllLeaderboard } from "api/getAllLeaderboard";
import { getLeaderboardData } from "api/getLeaderboardData";
import { DateTime } from "luxon";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Leaderboard, LeaderboardPoint } from "types/Leaderboard";
import { sleep } from "utils/sleep";
import { LeaderboardContext } from "./LeaderboardContext";

export const GraphContext = createContext<{
  points?: LeaderboardPoint[];
}>({});

export const GraphProvider = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const [points, setPoints] = useState<LeaderboardPoint[]>([]);
  const lastUpdated = useRef<Record<string, DateTime>>({});

  useEffect(() => {
    const f = async () => {
      const data = await getAllLeaderboard();
      setPoints(data);
    };
    f();
  }, []);

  useEffect(() => {
    if (!lbData) return;
    const updated = lbData.filter((d) => {
      if (
        lastUpdated.current[d.rank] &&
        lastUpdated.current[d.rank]
          .diff(DateTime.fromISO(d.date))
          .as("minute") < 0
      )
        return false;
      lastUpdated.current[d.rank] = DateTime.fromISO(d.date);
      return true;
    });

    if (updated.length > 0) setPoints((p) => [...p, ...updated]);
  }, [lbData]);

  return (
    <GraphContext.Provider value={{ points }}>{children}</GraphContext.Provider>
  );
};
