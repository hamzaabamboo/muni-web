import { tierBorders } from "constants/tierborder";
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
import { compareTwoStrings } from "string-similarity";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { GraphContext } from "./GraphContext";

const THRESHOLD = 0.69;

export const GraphDisplayContext = createContext<{
  points?: LeaderboardPoint[];
  displayTier?: Tier[];
  setDisplayTier?: Dispatch<SetStateAction<Tier[]>>;
  allTiers?: Tier[];
  playerFilters?: string[];
  setPlayerFilters?: Dispatch<SetStateAction<string[]>>;
}>({});

export const GraphDisplayProvider: FC<{
  points?: LeaderboardPoint[];
  children: React.ReactNode;
}> = ({ points: staticPoints, children }) => {
  const { points: _points } = useContext(GraphContext);
  const [playerFilters, setPlayerFilters] = useState<string[]>([]);
  const [displayTier, setDisplayTier] = useLocalStorage<Tier[]>(
    "displayTier",
    tierBorders
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
    if (playerFilters.length > 0)
      return data
        .filter((p) =>
          playerFilters.some(
            (f) =>
              (p.name && compareTwoStrings(f, p.name) > THRESHOLD) ||
              (p.description &&
                compareTwoStrings(f, p.description) > THRESHOLD) ||
              (p.playerid && compareTwoStrings(f, p.playerid) > THRESHOLD)
          )
        )
        .sort((b, a) => (isoParse(b.date) > isoParse(a.date) ? 0 : 1));
    return data
      .filter((f) => displayTier.includes(f.rank as Tier))
      .sort((b, a) => (isoParse(b.date) > isoParse(a.date) ? 0 : 1));
  }, [data, displayTier, playerFilters]);

  return (
    <GraphDisplayContext.Provider
      value={{
        points,
        displayTier,
        setDisplayTier,
        allTiers,
        playerFilters,
        setPlayerFilters,
      }}
    >
      {children}
    </GraphDisplayContext.Provider>
  );
};
