import { getEventType } from "api/utils";
import { forecastConstant } from "constants/forecast";
import { DateTime } from "luxon";
import { Event } from "types/Event";
import { Tier } from "types/Leaderboard";

export const getPredictedScore = (
  rank: Tier,
  time: Date,
  event: Event,
  average: number
) => {
  if (!event) return 0;
  const startdate = DateTime.fromISO(event.startdate);
  const enddate = DateTime.fromISO(event.enddate);
  const hoursIn = DateTime.fromJSDate(time).diff(startdate).as("hours");
  const type = getEventType(event);
  if (forecastConstant[type] && rank in forecastConstant[type]) {
    const { hoursBeforeEnd, accleration } = forecastConstant[type][rank];
    const timeLeft = enddate.diff(DateTime.fromJSDate(time)).as("hours");
    if (timeLeft < hoursBeforeEnd) {
      const t = hoursBeforeEnd - timeLeft;
      const linear = (hoursIn - t) * average;
      return Math.floor(linear + (average + accleration * t) * t);
    }
  }
  return Math.floor(average * hoursIn);
};
