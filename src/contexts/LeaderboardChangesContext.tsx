import {
  getLeaderboardChanges,
  saveLeaderboardChanges,
} from "db/leaderboardChanges";
import { useLocalStorage } from "hooks/useLocalstorage";
import { usePromiseEffect } from "hooks/usePromiseEffect";
import { DateTime } from "luxon";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Leaderboard, PastChangeEntry, Tier } from "types/Leaderboard";
import { EventContext } from "./EventContext";
import { LeaderboardContext } from "./LeaderboardContext";

export const LeaderboardChangesContext = createContext<{
  changes?: Record<Tier, number>;
  pastUpdates?: PastChangeEntry[];
}>({});

export const LeaderboardChangesProvider = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const { event } = useContext(EventContext);
  const [changes, setChanges] = useState<Record<Tier, number>>(
    {} as Record<Tier, number>
  );
  const [pastUpdates, setPastUpdates] = useState<PastChangeEntry[]>([]);

  const oldLb = useRef<Leaderboard>();

  const getPastChanges = useCallback(async () => {
    if (!event) return Promise.resolve([]);
    return getLeaderboardChanges(event.eventid);
  }, [event]);

  usePromiseEffect(getPastChanges, setPastUpdates);

  useEffect(() => {
    if (!event) return;
    if (oldLb.current) {
      let newUpdates: PastChangeEntry[] = [];
      const newChanges = lbData.map((d) => {
        const old = oldLb.current.find((olb) => olb.rank === d.rank);
        if (!old) return [d.rank, d.points];
        const dPoints = d.points - old.points;
        const change =
          dPoints > 0
            ? dPoints
            : DateTime.fromISO(d.date).diffNow().as("minutes") > -4
            ? changes[d.rank] ?? 0
            : 0;

        if (dPoints > 0) {
          newUpdates.push({
            event: event.eventid,
            rank: d.rank,
            change,
            date: DateTime.fromISO(d.date).toSeconds(),
            points: d.points,
          });
        }
        return [
          d.rank,
          // Only update if the new point is not 0 and not old enough
          change,
        ];
      });
      setPastUpdates((previousUpdate) => [...previousUpdate, ...newUpdates]);
      saveLeaderboardChanges(newUpdates);
      setChanges(Object.fromEntries(newChanges));
    }
    oldLb.current = lbData;
  }, [lbData, event]);

  return (
    <LeaderboardChangesContext.Provider value={{ changes, pastUpdates }}>
      {children}
    </LeaderboardChangesContext.Provider>
  );
};
