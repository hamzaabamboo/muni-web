import { isoParse } from "d3-time-format";
import { useLocalStorage } from "hooks/useLocalstorage";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { GraphContext } from "./GraphContext";

export const GraphDisplayContext = createContext<{
  points?: LeaderboardPoint[];
  displayTier?: Tier[];
  setDisplayTier?: Dispatch<SetStateAction<Tier[]>>;
  allTiers?: Tier[];
}>({});

export const GraphDisplayProvider: FC<{ points?: LeaderboardPoint[] }> = ({
  points: staticPoints,
  children,
}) => {
  const { points: _points } = useContext(GraphContext);
  const [displayTier, setDisplayTier] = useLocalStorage<Tier[]>(
    "displayTier",
    null
  );
  const [allTiers, setAllTiers] = useState<Tier[]>([]);

  const data = useMemo(() => {
    return staticPoints || _points;
  }, [staticPoints, _points]);

  useEffect(() => {
    if (allTiers.length === 0 && data)
      setAllTiers(Array.from(new Set(data.map((d) => d.rank as Tier))));
  }, [data]);

  const points = useMemo(() => {
    if (!data) return;
    if (!displayTier) return data;
    return data
      .filter((f) => displayTier.includes(f.rank as Tier))
      .sort((b, a) => (isoParse(b.date) > isoParse(a.date) ? 0 : 1));
  }, [data, displayTier]);

  return (
    <GraphDisplayContext.Provider
      value={{ points, displayTier, setDisplayTier, allTiers }}
    >
      {children}
    </GraphDisplayContext.Provider>
  );
};
