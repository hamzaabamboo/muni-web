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
import { EventContext } from "./EventContext";
import { GraphContext } from "./GraphContext";
import { GraphDisplayContext } from "./GraphDisplayContext";

export const AnalysisContext = createContext<{
  rate?: Record<Tier, LeaderboardPoint[]>;
  forecast?: Record<Tier, LeaderboardPoint[]>;
  interval?: number;
  setInterval?: Dispatch<SetStateAction<number>>;
}>({});

export const AnalysisProvider: FC<{ all?: boolean }> = ({ children, all }) => {
  const { points: allPoints } = useContext(GraphContext);
  const { points: displayPoints } = useContext(GraphDisplayContext);
  const { event } = useContext(EventContext);
  const worker = useRef<Worker>();
  const [rate, setRate] = useState<Record<Tier, LeaderboardPoint[]>>();
  const [forecast, setForecast] = useState<Record<Tier, LeaderboardPoint[]>>();
  const [interval, setInterval] = useLocalStorage<number>(
    "groupInterval",
    3600000
  );

  const points = useMemo(() => {
    return all ? allPoints : displayPoints || allPoints;
  }, [allPoints, displayPoints]);

  const updateData = ({
    data,
  }: MessageEvent<{
    rate: Record<Tier, LeaderboardPoint[]>;
    forecast: Record<Tier, LeaderboardPoint[]>;
  }>) => {
    const { rate, forecast } = data;
    setRate(rate);
    setForecast(forecast);
  };

  useEffect(() => {
    worker.current = new Worker(
      new URL("../workers/worker.ts", import.meta.url),
      { type: "module" }
    );
    worker.current.postMessage({ points, interval, event });
    worker.current.onmessage = updateData;
    return () => {
      worker.current.removeEventListener("message", updateData);
      return worker.current.terminate();
    };
  }, [points, interval]);

  return (
    <AnalysisContext.Provider value={{ rate, forecast, interval, setInterval }}>
      {children}
    </AnalysisContext.Provider>
  );
};
