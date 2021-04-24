import { getEventType } from "api/utils";
import { forecastConstant } from "constants/forecast";
import { allTiers } from "constants/tierborder";
import { maxIndex, minIndex, sum } from "d3-array";
import { DateTime } from "luxon";
import { Event } from "types/Event";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { getPredictedScore } from "utils/getPredictedScore";
import { generateTimeArray, groupByTime } from "utils/groupByTime";
import { groupBy, mapValues } from "utils/object";

export default {};

const ctx: Worker = self as any;

ctx.onmessage = ({
  data,
}: MessageEvent<{
  points: LeaderboardPoint[];
  interval?: number;
  event: Event;
}>) => {
  const { points, interval, event } = data;
  const diff = groupBy(points, (p) => p.rank as Tier);
  for (const group in diff) {
    if (!(group in allTiers)) continue;
    diff[Number(group) as Tier] = diff[Number(group) as Tier]
      .sort(
        (a, b) =>
          DateTime.fromISO(a.date).toSeconds() -
          DateTime.fromISO(b.date).toSeconds()
      )
      .map((point, idx, arr) => {
        return {
          ...point,
          points: idx > 0 ? point.points - arr[idx - 1].points : 0,
        };
      });
    diff[Number(group) as Tier] = groupByTime(
      diff[Number(group) as Tier],
      interval ?? 3600000
    ).map(({ date, data: point }) => {
      return {
        eventid: points.find((e) => e.eventid).eventid,
        rank: Number(group) as Tier,
        points: sum(point, (d) => d.points),
        date: date,
      };
    });
  }

  const forecast: Record<Tier, LeaderboardPoint[]> = mapValues(
    groupBy(points, (d) => d.rank),
    (data, rank) => {
      const maxIdx = maxIndex(data, (a) => a.points);
      const minIdx = minIndex(data, (a) => a.points);
      const diffHr = DateTime.fromISO(data[maxIdx].date)
        .diff(DateTime.fromISO(data[minIdx].date))
        .as("hours");
      const avg = data[maxIdx].points / (diffHr > 0 ? diffHr : 1);
      return [
        data[maxIdx],
        ...generateTimeArray(
          DateTime.fromISO(data[maxIdx].date).toJSDate(),
          DateTime.fromISO(event.enddate).toJSDate(),
          3600000
        ).map((time, i) => {
          return {
            eventid: points.find((e) => e.eventid).eventid,
            rank: Number(rank) as Tier,
            points: getPredictedScore(
              Number(rank) as Tier,
              DateTime.fromMillis(time * 3600000).toJSDate(),
              event,
              avg
            ),
            date: DateTime.fromMillis(time * 3600000).toISO(),
          };
        }),
      ];
    }
  );

  ctx.postMessage({
    rate: diff,
    forecast:
      points.length > 20 && getEventType(event) in forecastConstant
        ? forecast
        : {},
  });
};
