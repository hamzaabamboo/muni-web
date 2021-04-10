import { sum } from "d3-array";
import { DateTime } from "luxon";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { groupByTime } from "utils/groupByTime";

export default {};

const ctx: Worker = self as any;

ctx.onmessage = ({
  data,
}: MessageEvent<{ points: LeaderboardPoint[]; interval?: number }>) => {
  const { points, interval } = data;
  const groups = {} as Record<Tier, LeaderboardPoint[]>;
  points.forEach((p) => {
    if (!(p.rank in groups)) groups[p.rank] = [];
    groups[p.rank].push(p);
  });
  for (let group in groups) {
    groups[Number(group) as Tier] = groups[Number(group) as Tier]
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
    groups[Number(group) as Tier] = groupByTime(
      groups[Number(group) as Tier],
      interval ?? 3600000
    ).map(({ date, data }) => {
      return {
        eventid: data[0].eventid,
        rank: Number(group) as Tier,
        points: sum(data, (d) => d.points),
        date: date,
      };
    });
  }
  ctx.postMessage(groups);
};
