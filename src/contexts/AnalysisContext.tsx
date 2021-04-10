import { interval } from "d3-timer";
import { DateTime } from "luxon";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { useLocalStorage } from "web-api-hooks";
import { GraphContext } from "./GraphContext";
import { GraphDisplayContext } from "./GraphDisplayContext";

export const AnalysisContext = createContext<{
  rate?: Record<Tier, LeaderboardPoint[]>;
  predictions?: Record<Tier, LeaderboardPoint[]>;
  interval?: number;
  setInterval?: Dispatch<SetStateAction<number>>;
}>({});

export const AnalysisProvider: FC<{ all?: boolean }> = ({ children, all }) => {
  const { points: allPoints } = useContext(GraphContext);
  const { points: displayPoints } = useContext(GraphDisplayContext);
  const worker = useRef<Worker>();
  const [rate, setRate] = useState<Record<Tier, LeaderboardPoint[]>>();
  const [interval, setInterval] = useLocalStorage<number>(
    "groupInterval",
    3600000
  );

  const points = useMemo(() => {
    return all ? allPoints : displayPoints || allPoints;
  }, [allPoints, displayPoints]);

  const updateData = ({
    data,
  }: MessageEvent<Record<Tier, LeaderboardPoint[]>>) => {
    setRate(data);
  };

  useEffect(() => {
    worker.current = new Worker(
      new URL("../workers/worker.ts", import.meta.url),
      { type: "module" }
    );
    worker.current.postMessage({ points, interval });
    worker.current.onmessage = updateData;
    return () => {
      worker.current.removeEventListener("message", updateData);
      return worker.current.terminate();
    };
  }, [points, interval]);

  return (
    <AnalysisContext.Provider
      value={{ rate, predictions: {} as any, interval, setInterval }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};
