import { getAllLeaderboard } from "api/getAllLeaderboard";
import { useLocalStorage } from "hooks/useLocalstorage";
import { DateTime } from "luxon";
import {
  createContext,
  Dispatch,
  SetStateAction,
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
  displayTier?: Tier[];
  setDisplayTier?: Dispatch<SetStateAction<Tier[]>>;
  allTiers?: Tier[];
}>({});

export const GraphProvider = ({ children }) => {
  const { lbData } = useContext(LeaderboardContext);
  const [_points, setPoints] = useState<LeaderboardPoint[]>([]);
  const [displayTier, setDisplayTier] = useLocalStorage<Tier[]>(
    "displayTier",
    null
  );
  const [allTiers, setAllTiers] = useState<Tier[]>([]);
  const lastUpdated = useRef<Record<string, DateTime>>({});

  useEffect(() => {
    const f = async () => {
      const data = await getAllLeaderboard();
      const allTiers = Array.from(new Set(data.map((d) => d.rank as Tier)));
      setAllTiers(allTiers);
      if (displayTier === null) setDisplayTier(allTiers);
      setPoints(data);
    };
    f();
  }, []);

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

  const points = useMemo(() => {
    if (!displayTier) return _points;
    return _points.filter((f) => displayTier.includes(f.rank as Tier));
  }, [_points, displayTier]);

  return (
    <GraphContext.Provider
      value={{ points, displayTier, setDisplayTier, allTiers }}
    >
      {children}
    </GraphContext.Provider>
  );
};
