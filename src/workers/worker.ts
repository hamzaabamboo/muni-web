import { max, maxIndex, minIndex, sum } from "d3-array";
import { DateTime } from "luxon";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { groupByTime } from "utils/groupByTime";

export default {};

const ctx: Worker = self as any;

const groupBy = <T = any, K extends string | number | symbol = string>(
  data: T[],
  getKey: (data: T) => K
): Record<K, T[]> => {
  const groups = {} as Record<K, T[]>;
  data.forEach((p) => {
    if (!(getKey(p) in groups)) groups[getKey(p)] = [];
    groups[getKey(p)].push(p);
  });
  return groups;
};

ctx.onmessage = ({
  data,
}: MessageEvent<{ points: LeaderboardPoint[]; interval?: number }>) => {
  const { points, interval } = data;
  const diff = groupBy(points, (p) => p.rank as Tier);
  for (let group in diff) {
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

  const groups = groupBy(points, (d) => d.rank);
  const average = {} as Record<Tier, number>;
  for (let rank in groups) {
    const maxIdx = maxIndex(groups[rank], (a) => a.points);
    const minIdx = minIndex(groups[rank], (a) => a.points);
    const maxPoint = groups[rank][maxIdx];
    const minPoint = groups[rank][minIdx];
    average[rank] =
      maxPoint.points /
      DateTime.fromISO(maxPoint.date)
        .diff(DateTime.fromISO(minPoint.date))
        .as("hours");
  }
  console.log(average);

  ctx.postMessage({
    rate: diff,
    forecast: [],
  });
};
