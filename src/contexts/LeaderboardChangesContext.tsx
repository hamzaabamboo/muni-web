import { useLocalStorage } from "hooks/useLocalstorage";
import { DateTime } from "luxon";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Event } from "types/Event";
import { Leaderboard, Tier } from "types/Leaderboard";
import { LeaderboardContext } from "./LeaderboardContext";

interface PastChangeEntry {
  point: number;
  change: number;
  date: string;
}
export const LeaderboardChangesContext = createContext<{
  changes?: Record<Tier, number>;
  pastUpdates?: Record<Tier, PastChangeEntry[]>;
}>({});

export const LeaderboardChangesProvider = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const [changes, setChanges] = useState<Record<Tier, number>>(
    {} as Record<Tier, number>
  );
  const [pastUpdates, setPastUpdates] = useLocalStorage<
    Record<Tier, PastChangeEntry[]>
  >("pastUpdates", {} as Record<Tier, PastChangeEntry[]>);

  const oldLb = useRef<Leaderboard>();

  useEffect(() => {
    if (oldLb.current) {
      let newUpdates: [Tier, PastChangeEntry][] = [];
      const newChanges = lbData.map((d) => {
        const old = oldLb.current.find((olb) => olb.rank === d.rank);
        const dPoints = d.points - old.points;
        const change =
          dPoints > 0
            ? dPoints
            : DateTime.fromISO(d.date).diffNow().as("minutes") > -4
            ? changes[d.rank] ?? 0
            : 0;

        if (dPoints > 0) {
          newUpdates.push([
            d.rank,
            {
              change,
              date: d.date,
              point: d.points,
            },
          ]);
        }
        return [
          d.rank,
          // Only update if the new point is not 0 and not old enough
          change,
        ];
      });
      setPastUpdates((previousUpdate) => {
        let copy = { ...previousUpdate };
        newUpdates.forEach(([rank, entry]) => {
          if (!(rank in copy)) {
            copy[rank] = [] as PastChangeEntry[];
          }
          copy[rank].push(entry);
        });
        return copy;
      });
      setChanges(Object.fromEntries(newChanges));
    }
    oldLb.current = lbData;
  }, [lbData]);

  return (
    <LeaderboardChangesContext.Provider value={{ changes, pastUpdates }}>
      {children}
    </LeaderboardChangesContext.Provider>
  );
};
