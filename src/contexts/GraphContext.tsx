import { getAllLeaderboard } from "api/getAllLeaderboard";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import { DateTime } from "luxon";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LeaderboardPoint } from "types/Leaderboard";
import { EventContext } from "./EventContext";
import { LeaderboardContext } from "./LeaderboardContext";

export const GraphContext = createContext<{
  points?: LeaderboardPoint[];
}>({});

export const GraphProvider: FC<{}> = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const { event } = useContext(EventContext);
  const [points, setPoints] = useState<LeaderboardPoint[]>();
  const lastUpdated = useRef<Record<string, DateTime>>({});

  const getData = useCallback(() => {
    if (!event) return Promise.resolve(undefined);
    return getAllLeaderboard(event.eventid);
  }, [event]);

  usePromiseEffect(getData, setPoints);

  useEffect(() => {
    if (!lbData || !points) return;
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
