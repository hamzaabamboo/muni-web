import { thresholds } from "constants/threshold";
import { DateTime, Duration } from "luxon";
import { EventType } from "types/Event";
import { LeaderboardEntry } from "types/Leaderboard";

export const getIsPlayingStyles = (
  data: LeaderboardEntry,
  lastUpdated: number,
  eventType: EventType
) => {
  if (lastUpdated > thresholds[eventType]?.maxPerGame ?? 3000)
    return { bg: "red.100" };
  if (DateTime.fromISO(data.date).diffNow().as("minutes") < -10) return {};
  return {
    bg: "gray.100",
  };
};

export const getToBoatTime = (ms: number): string => {
  if (isNaN(ms) || ms < 0) return "--:--";
  return Duration.fromMillis(ms).toFormat("hh:mm");
};
