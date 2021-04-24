import { ColorMode } from "@chakra-ui/color-mode";
import { thresholds } from "constants/threshold";
import { DateTime, Duration } from "luxon";
import { EventType } from "types/Event";
import { LeaderboardEntry } from "types/Leaderboard";

export const getIsPlayingStyles = (
  data: LeaderboardEntry,
  lastUpdated: number,
  eventType: EventType,
  colorMode: ColorMode,
  showRecentlyUpdated: boolean = true
) => {
  const threshold = thresholds[eventType]?.sort((a, b) => b.value - a.value);
  if (
    showRecentlyUpdated &&
    DateTime.fromISO(data.date).diffNow().as("minutes") < -10
  )
    return {};
  if (lastUpdated > threshold[0].value ?? 3000)
    return { bg: colorMode === "light" ? "red.100" : "red.800" };
  if (threshold[1] && lastUpdated > threshold[1].value)
    return { bg: colorMode === "light" ? "yellow.100" : "yellow.800" };
  return {
    bg: colorMode === "light" ? "gray.100" : "gray.700",
  };
};

export const getToBoatTime = (ms: number): string => {
  if (isNaN(ms) || ms < 0) return "--:--";
  return Duration.fromMillis(ms).toFormat("hh:mm");
};
