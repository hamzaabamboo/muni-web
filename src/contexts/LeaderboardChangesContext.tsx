import { DateTime } from "luxon";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Leaderboard, PastChangeEntry, Tier } from "types/Leaderboard";
import { mapPointsToChanges } from "utils/mapPoints";
import { EventContext } from "./EventContext";
import { GraphContext } from "./GraphContext";
import { GraphDisplayContext } from "./GraphDisplayContext";
import { LeaderboardContext } from "./LeaderboardContext";
import { ServerContext } from "./ServerProvider";

export const LeaderboardChangesContext = createContext<{
  changes?: Record<Tier, number>;
  pastUpdates?: PastChangeEntry[];
}>({});

export const LeaderboardChangesProvider: FC<{}> = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const { points } = useContext(GraphContext);
  const { event } = useContext(EventContext);
  const { server } = useContext(ServerContext);
  const [changes, setChanges] = useState<Partial<Record<Tier, number>>>({});
  const [pastUpdates, setPastUpdates] = useState<
    PastChangeEntry[] | undefined
  >();

  const oldLb = useRef<Leaderboard>();

  useEffect(() => {
    if (!pastUpdates && points) {
      setPastUpdates(points.map<PastChangeEntry>(mapPointsToChanges));
    }
  }, [points]);

  useEffect(() => {
    oldLb.current = undefined;
    setChanges({});
  }, [server]);

  useEffect(() => {
    if (!event || !pastUpdates) return;
    if (oldLb.current) {
      const newUpdates: PastChangeEntry[] = [];
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
            date: d.date,
            points: d.points,
            name: d.name,
          });
        }
        return [
          d.rank,
          // Only update if the new point is not 0 and not old enough
          change,
        ];
      });
      setPastUpdates((previousUpdate) => [...previousUpdate, ...newUpdates]);
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
