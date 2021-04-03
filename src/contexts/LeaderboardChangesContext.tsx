import { DateTime } from "luxon";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Event } from "types/Event";
import { Leaderboard, Tier } from "types/Leaderboard";
import { LeaderboardContext } from "./LeaderboardContext";

export const LeaderboardChangesContext = createContext<{
  changes?: Record<Tier, number>;
}>({});

export const LeaderboardChangesProvider = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const [changes, setChanges] = useState<Record<Tier, number>>(
    {} as Record<Tier, number>
  );
  const oldLb = useRef<Leaderboard>();

  useEffect(() => {
    if (oldLb.current) {
      const newChanges = lbData.map((d) => {
        const old = oldLb.current.find((olb) => olb.rank === d.rank);
        const dPoints = d.points - old.points;
        return [
          d.rank,
          // Only update if the new point is not 0 and not old enough
          dPoints > 0
            ? dPoints
            : DateTime.fromISO(d.date).diffNow().as("minutes") > -4
            ? changes[d.rank] ?? 0
            : 0,
        ];
      });
      setChanges(Object.fromEntries(newChanges));
    }
    oldLb.current = lbData;
  }, [lbData]);

  return (
    <LeaderboardChangesContext.Provider value={{ changes }}>
      {children}
    </LeaderboardChangesContext.Provider>
  );
};
