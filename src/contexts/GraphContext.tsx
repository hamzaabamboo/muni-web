import { getAllLeaderboard } from "api/getAllLeaderboard";
import { useLocalStorage } from "hooks/useLocalstorage";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import { DateTime } from "luxon";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { LeaderboardContext } from "./LeaderboardContext";

export const GraphContext = createContext<{
  points?: LeaderboardPoint[];
}>({});

export const GraphProvider = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const [points, setPoints] = useState<LeaderboardPoint[]>([]);
  const lastUpdated = useRef<Record<string, DateTime>>({});

  usePromiseEffect(getAllLeaderboard, setPoints);

  useEffect(() => {
    if (!lbData) return;
    const updated = lbData.filter((d) => {
      if (
        lastUpdated.current[d.rank] &&
        DateTime.fromISO(d.date)
          .diff(lastUpdated.current[d.rank])
          .as("seconds") <= 0
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
