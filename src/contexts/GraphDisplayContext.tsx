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
import { GraphContext } from "./GraphContext";
import { LeaderboardContext } from "./LeaderboardContext";

export const GraphDisplayContext = createContext<{
  points?: LeaderboardPoint[];
  displayTier?: Tier[];
  setDisplayTier?: Dispatch<SetStateAction<Tier[]>>;
  allTiers?: Tier[];
}>({});

export const GraphDisplayProvider = ({ children }) => {
  const { points: _points } = useContext(GraphContext);
  const [displayTier, setDisplayTier] = useLocalStorage<Tier[]>(
    "displayTier",
    null
  );
  const [allTiers, setAllTiers] = useState<Tier[]>([]);

  useEffect(() => {
    if (allTiers.length === 0)
      setAllTiers(Array.from(new Set(_points.map((d) => d.rank as Tier))));
  }, [_points]);

  const points = useMemo(() => {
    if (!displayTier) return _points;
    return _points.filter((f) => displayTier.includes(f.rank as Tier));
  }, [_points, displayTier]);

  return (
    <GraphDisplayContext.Provider
      value={{ points, displayTier, setDisplayTier, allTiers }}
    >
      {children}
    </GraphDisplayContext.Provider>
  );
};
